/**
 * Airtable photo/croquis URLs point at arbitrary hosts chosen by stylists
 * (Discord CDN, Imgur, etc.), so next/image can't optimize them directly
 * without an ever-growing images.remotePatterns allowlist. Routing them
 * through our own same-origin proxy (/api/img) lets next/image treat them
 * as local, so it still resizes/re-encodes them instead of shipping the
 * original file straight through.
 */
export function proxiedImageUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}
