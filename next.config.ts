import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "loremflickr.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
