/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'github.com', 'raw.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: false, // Réactivé pour de meilleures performances
  },
  // Configuration CMS-friendly
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Pas de configuration d'export pour supporter les API routes
  trailingSlash: false,
  skipTrailingSlashRedirect: false,
}

module.exports = nextConfig
