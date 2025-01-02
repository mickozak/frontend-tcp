// next.config.ts
import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/problem/:id',
        destination: '/problem/:id',
      },
    ];
  },
};

export default config;
