/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // 1. Placeholder images
      {
        protocol: "https",
        hostname: "placehold.co",
      },

      // 2. Cloudinary (Added)
      // This allows any image served from Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**", 
      },

      // 3. Local Django (Keep for fallback/testing)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },

      // 4. Production backend (Keep for fallback)
      {
        protocol: "https",
        hostname: "bugaking.pythonanywhere.com", 
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;