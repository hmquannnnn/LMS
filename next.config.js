/** @type {import('next').NextConfig} */
const nextConfig = {
    css: ['styles/globals.css'],
    async rewrites() {
        return [
            {
                source: '/api/v1:path*',
                destination: 'http://172.22.0.0/api/v1:path*',
            },
        ];
    },
}

module.exports = nextConfig
