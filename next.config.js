const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,        
});

/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.SERVICE_URL}/:path*`
            }
        ]
    }
}

module.exports = withPWA(nextConfig);
