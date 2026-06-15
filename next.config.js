/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'placehold.co' }
    ]
  },
  webpack(config) {
    // Fix Vercel environments that may incorrectly resolve next-auth React imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-auth/react.js': 'next-auth/react'
    }
    return config
  }
}

module.exports = nextConfig
