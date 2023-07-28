/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  rewrites: async () => [
    {
      source: "/api/:quote_id",
      destination:
        "https://xjgg9sxeak.execute-api.us-east-1.amazonaws.com/?quote_id=:quote_id",
    },
  ],
};

module.exports = nextConfig;
