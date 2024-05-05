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
    domains: ["densach.edu.vn"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "10049",
        pathname: "/api/v1/media/**",
      },
      {
        protocol: "http",
        hostname: "www.minhupro.xyz",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "densach.edu.vn",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "encrypted-tbn3.gstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
