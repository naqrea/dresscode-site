import type { Tenue, TenueFiltres } from "@/types/tenue";

/**
 * Server-only data layer for the `Tenues` Airtable table.
 * Never import this file from a "use client" component: it reads
 * process.env.AIRTABLE_TOKEN, a secret that must stay on the server.
 *
 * Strategy (see project instructions §14-15): fetch the whole table once,
 * cached by Next.js, and let the client filter/search/sort in-memory.
 * This keeps Airtable request volume low regardless of traffic or how
 * many times a user searches/filters.
 */

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "appvH78hHfA6UlvzU";
const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE_TENUES || "Tenues";
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

/** Seconds between background revalidations of the Airtable data cache. */
const REVALIDATE_SECONDS = 1800;

/**
 * Only request the fields the storefront actually needs. This also acts as
 * a structural guarantee that internal fields (reference_*, total_commandes,
 * id_employe, ...) never leave Airtable in the first place.
 */
const FIELDS = [
  "nom_tenue",
  "couleur",
  "sexe",
  "photo_tenue",
  "croquis_tenue",
  "collection",
  "tag",
  "prix",
  "statut",
] as const;

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableListResponse {
  records: AirtableRecord[];
  offset?: string;
}

function buildUrl(offset?: string): string {
  const params = new URLSearchParams();
  for (const field of FIELDS) params.append("fields[]", field);
  params.set("pageSize", "100");
  if (offset) params.set("offset", offset);
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_TABLE
  )}?${params.toString()}`;
}

async function fetchAllRecords(): Promise<AirtableRecord[]> {
  if (!AIRTABLE_TOKEN) {
    console.error(
      "[airtable] AIRTABLE_TOKEN manquant : impossible de charger les tenues."
    );
    return [];
  }

  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    let res: Response;
    try {
      res = await fetch(buildUrl(offset), {
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
        next: { revalidate: REVALIDATE_SECONDS, tags: ["tenues"] },
      });
    } catch (error) {
      console.error("[airtable] échec réseau lors de la récupération des tenues", error);
      break;
    }

    if (!res.ok) {
      console.error(`[airtable] réponse ${res.status} : ${await res.text()}`);
      break;
    }

    const data = (await res.json()) as AirtableListResponse;
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

function stripEmoji(value: string): string {
  return value.replace(/\p{Extended_Pictographic}/gu, "").trim();
}

function normalizeCouleurs(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const out = new Set<string>();
  for (const value of raw) {
    if (typeof value !== "string") continue;
    for (const part of value.split(";")) {
      const clean = stripEmoji(part);
      if (clean) out.add(clean);
    }
  }
  return [...out];
}

function normalizeTags(raw: unknown): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(/[,;/]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function normalizePrix(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw !== "string") return null;
  const cleaned = raw.replace(/[^\d.,]/g, "").replace(",", ".");
  if (!cleaned) return null;
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

const INDISPONIBLE_KEYWORDS = ["indispo", "rupture", "epuise", "vendu", "archive"];

function normalizeForMatch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function toTenue(record: AirtableRecord): Tenue {
  const f = record.fields;
  const nom =
    typeof f.nom_tenue === "string" && f.nom_tenue.trim()
      ? f.nom_tenue.trim()
      : "Tenue sans nom";
  const prix = normalizePrix(f.prix);
  const statutRaw =
    typeof f.statut === "string" && f.statut.trim() ? f.statut.trim() : null;
  const disponible = !statutRaw
    ? true
    : !INDISPONIBLE_KEYWORDS.some((keyword) =>
        normalizeForMatch(statutRaw).includes(keyword)
      );
  const croquis =
    typeof f.croquis_tenue === "string" && f.croquis_tenue.trim()
      ? f.croquis_tenue.trim()
      : null;
  const photo =
    typeof f.photo_tenue === "string" && f.photo_tenue.trim()
      ? f.photo_tenue.trim()
      : null;

  return {
    id: record.id,
    nom,
    prix,
    prixAffiche: prix !== null ? `${prix.toLocaleString("fr-FR")} $` : "Sur devis",
    collection:
      typeof f.collection === "string" && f.collection.trim()
        ? f.collection.trim()
        : null,
    couleurs: normalizeCouleurs(f.couleur),
    tags: normalizeTags(f.tag),
    sexe: typeof f.sexe === "string" && f.sexe.trim() ? f.sexe.trim() : null,
    statut: statutRaw,
    disponible,
    // Stylist sketches take priority over studio photos when both exist (§6).
    image: croquis ?? photo,
    imageSecondaire: croquis ? photo : null,
  };
}

export async function getTenues(): Promise<Tenue[]> {
  const records = await fetchAllRecords();
  return records.map(toTenue);
}

export function getFiltres(tenues: Tenue[]): TenueFiltres {
  const collections = new Set<string>();
  const couleurs = new Set<string>();
  const tags = new Set<string>();
  const sexes = new Set<string>();

  for (const tenue of tenues) {
    if (tenue.collection) collections.add(tenue.collection);
    tenue.couleurs.forEach((c) => couleurs.add(c));
    tenue.tags.forEach((t) => tags.add(t));
    if (tenue.sexe) sexes.add(tenue.sexe);
  }

  const sort = (values: Set<string>) => [...values].sort((a, b) => a.localeCompare(b, "fr"));

  return {
    collections: sort(collections),
    couleurs: sort(couleurs),
    tags: sort(tags),
    sexes: sort(sexes),
  };
}
