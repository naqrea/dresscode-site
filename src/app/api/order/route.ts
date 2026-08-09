import { NextResponse } from "next/server";
import { chunkLines, sendDiscordEmbed, truncateFieldValue } from "@/lib/discord";
import { sanitizeOptionalText, validateContact } from "@/lib/validation";

interface OrderItemPayload {
  nom: string;
  quantite: number;
  prix: number | null;
}

function parseItems(raw: unknown): OrderItemPayload[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 50) return null;
  const items: OrderItemPayload[] = [];
  for (const entry of raw) {
    if (typeof entry !== "object" || entry === null) return null;
    const e = entry as Record<string, unknown>;
    const nom = typeof e.nom === "string" ? e.nom.trim() : "";
    const quantite = Number(e.quantite);
    const prix = typeof e.prix === "number" && Number.isFinite(e.prix) ? e.prix : null;
    if (!nom || !Number.isInteger(quantite) || quantite < 1 || quantite > 99) return null;
    items.push({ nom, quantite, prix });
  }
  return items;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[api/order] DISCORD_WEBHOOK_URL manquant.");
    return NextResponse.json(
      { ok: false, error: "Le service de commande est momentanément indisponible." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  const contact = validateContact(body);
  if (!contact.ok) {
    return NextResponse.json({ ok: false, error: contact.error }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const items = parseItems(b.items);
  if (!items) {
    return NextResponse.json(
      { ok: false, error: "Le panier est vide ou invalide." },
      { status: 400 }
    );
  }

  const informations = sanitizeOptionalText(b.informations);

  const total = items.reduce(
    (sum, item) => (item.prix !== null ? sum + item.prix * item.quantite : sum),
    0
  );
  const hasUnpricedItem = items.some((item) => item.prix === null);
  const totalAffiche = `${total.toLocaleString("fr-FR")} $${hasUnpricedItem ? " (+ articles sur devis)" : ""}`;

  const lignes = items.map((item) => {
    const prixLabel = item.prix !== null ? `${item.prix.toLocaleString("fr-FR")} $` : "sur devis";
    return `• ${item.nom} × ${item.quantite} — ${prixLabel}`;
  });

  const tenuesChunks = chunkLines(lignes);

  try {
    await sendDiscordEmbed(webhookUrl, {
      title: "🛍️ Nouvelle commande",
      fields: [
        {
          name: "CLIENT",
          value: `Nom : ${contact.data.nom}\nPrénom : ${contact.data.prenom}\nTéléphone : ${contact.data.telephone}`,
        },
        ...tenuesChunks.map((chunk, i) => ({
          name: i === 0 ? "TENUES" : "TENUES (suite)",
          value: chunk,
        })),
        { name: "TOTAL", value: totalAffiche },
        ...(informations
          ? [{ name: "INFORMATIONS COMPLÉMENTAIRES", value: truncateFieldValue(informations) }]
          : []),
      ],
      footer: "Commande envoyée depuis la boutique DRESSCODE",
    });
  } catch (error) {
    console.error("[api/order] échec envoi Discord", error);
    return NextResponse.json(
      { ok: false, error: "Impossible de transmettre la commande. Réessayez dans un instant." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
