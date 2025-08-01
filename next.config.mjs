/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 追加（静的エクスポート）
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
