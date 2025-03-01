import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bellzstudios.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'onimisea.azurewebsites.net',
      },
    ],
  },
};

export default nextConfig;
