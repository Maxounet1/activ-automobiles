/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'jympweqncrcgyvoqfqxp.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'spidervo.s3.fr-par.scw.cloud' },
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.supabase.co https://images.pexels.com https://spidervo.s3.fr-par.scw.cloud https://www.google-analytics.com https://*.tile.openstreetmap.org https://*.tile.openstreetmap.fr https://unpkg.com; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://nominatim.openstreetmap.org https://*.tile.openstreetmap.org https://*.tile.openstreetmap.fr; frame-src 'self' https://www.google.com;",
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ── Route consolidation: single canonical URL per content ──
      // Catalogue: /acheter → /voitures-occasion
      {
        source: '/acheter',
        destination: '/voitures-occasion',
        permanent: true,
      },
      {
        source: '/acheter/:slug',
        destination: '/voitures-occasion/:slug',
        permanent: true,
      },
      // Legacy vehicle route
      {
        source: '/vehicule/:slug',
        destination: '/voitures-occasion/:slug',
        permanent: true,
      },
      // Plural variant
      {
        source: '/vehicules',
        destination: '/voitures-occasion',
        permanent: true,
      },
      // Financement: /services/financement → /financement
      {
        source: '/services/financement',
        destination: '/financement',
        permanent: true,
      },
    ];
  },

};

module.exports = nextConfig;
