/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/darsi.app',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
