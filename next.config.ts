import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Vercel deployment
  output: "standalone",
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
