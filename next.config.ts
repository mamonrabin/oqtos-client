import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "oqtos.vercel.app",
        pathname: "/api/v1/uploads/**",
      },
    ],
  },

  experimental: {
    cpus: 1,
  },
};

export default nextConfig;