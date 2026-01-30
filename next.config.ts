/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Placeholder images
      {
        protocol: "https",
        hostname: "placehold.co",
      },

      // Local Django (DEV only)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // Production backend (VERY IMPORTANT)
      {
        protocol: "https",
        hostname: "bugaking.pythonanywhere.com", // change this
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
