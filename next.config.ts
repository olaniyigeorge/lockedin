import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bellzstudios.vercel.app',
      },
      // cloudinary for entries contents
    ],
  },

};

export default nextConfig;
