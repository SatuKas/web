import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ini akan ignore semua eslint errors saat build
    // atau lu bisa pake ini kalo mau tetep liat warning tapi ga block build
    // ignoreDuringBuilds: false,
    // warningDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
