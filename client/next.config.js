/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  reactStrictMode: true,
  pageExtensions: ["route.jsx", "route.js", "route.tsx", "route.ts"],
};

module.exports = nextConfig;
