/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/bpush/:path*',
  //       destination: '/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
