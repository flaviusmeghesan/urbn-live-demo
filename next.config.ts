import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // necesar pentru static export
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
