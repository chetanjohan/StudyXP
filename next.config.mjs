/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint errors won't fail production builds — caught in CI separately
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors won't fail production builds — caught in CI separately
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
