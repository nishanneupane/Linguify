/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes : 0-9/*",
          },
        ],
      },
    ];
  },
  images:{
    remotePatterns:[
      {
        hostname: "uploadthing.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "img.clerk.com",
      },
    ]
  }
  
};

export default nextConfig;
