/**
 * Uses Cloudinary fetch delivery for remote images. Cloudinary handles
 * format negotiation and quality automatically before next/image applies
 * the requested display size.
 */
export function optimizedImageUrl(source: string): string {
  if (source.startsWith("/")) {
    return source;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    return proxiedImageUrl(source);
  }

  if (source.includes("res.cloudinary.com/")) {
    return source;
  }

  return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(source)}`;
}

export function cloudinaryAssetUrl(publicId: string | undefined, fallback: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName || !publicId) {
    return fallback;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}

export function proxiedImageUrl(url: string): string {
  return `/api/img?url=${encodeURIComponent(url)}`;
}
