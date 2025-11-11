import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['ftp.goit.study'],
    remotePatterns: [{ protocol: 'https', hostname: 'ac.goit.global' }],
  },
};

export default nextConfig;
