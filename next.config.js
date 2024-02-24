/** @type {import('next').NextConfig} */
const nextConfig = {
  // css: ['styles/globals.css'],
  // async rewrites() {
  //     return [
  //         {
  //             source: '/api/v1:path*',
  //             destination: 'http://172.22.0.0/api/v1:path*',
  //         },
  //     ];
  // },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "10049",
        pathname: "/api/v1/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
