/** @type {import('next').NextConfig} */

const API_BASE = process.env.API_BASE_INTERNAL || "http://localhost:8000";

const nextConfig = {
    output: 'standalone',

  // Redirects
  async redirects() {
    return [
      { source: "/", destination: "/home", permanent: true },
      { source: "/robots.txt", destination: "/robots", permanent: true },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE}/api/:path*`, // -> FastAPI
      },
    ];
  },
};

export default nextConfig;
