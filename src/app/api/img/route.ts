import { NextResponse } from "next/server";

/**
 * Same-origin proxy for Airtable-hosted images (see src/lib/image.ts).
 * Lets next/image optimize photos from hosts we don't control/know in
 * advance, without exposing an open-ended remotePatterns allowlist.
 */

const MAX_BYTES = 8 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 8000;
const CACHE_CONTROL = "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000";

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("url");
  if (!target) {
    return NextResponse.json({ error: "Paramètre url manquant." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "URL invalide." }, { status: 400 });
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Protocole non supporté." }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(parsed.toString(), {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { Accept: "image/*" },
    });
  } catch {
    return NextResponse.json({ error: "Échec de récupération de l'image." }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "Image introuvable." }, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") || "";
  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "Le contenu distant n'est pas une image." }, { status: 415 });
  }

  const announcedLength = Number(upstream.headers.get("content-length") || "0");
  if (announcedLength > MAX_BYTES) {
    return NextResponse.json({ error: "Image trop volumineuse." }, { status: 413 });
  }

  const buffer = await upstream.arrayBuffer();
  if (buffer.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: "Image trop volumineuse." }, { status: 413 });
  }

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": CACHE_CONTROL,
    },
  });
}
