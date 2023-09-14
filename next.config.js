/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/test',
  distDir: 'build',
  async headers() {
    return []
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placekitten.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
