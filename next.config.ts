
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/v1/uploads/**",
      },
    ],
  },

  // Temporarily test with one CPU for page generation.
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
