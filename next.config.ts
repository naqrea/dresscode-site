import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // /api/img proxies Airtable-hosted photos (arbitrary hosts) so
    // next/image can optimize them — see src/lib/image.ts.
    localPatterns: [{ pathname: "/api/img" }],
  },
};

export default nextConfig;
