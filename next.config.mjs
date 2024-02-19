/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose' // required for the canvas to work
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  }
};

export default nextConfig;
