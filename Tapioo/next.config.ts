import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Two root layouts (/ and /en) mean 404s need their own shell — see app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
