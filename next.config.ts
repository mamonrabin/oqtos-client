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
}
};

export default nextConfig;