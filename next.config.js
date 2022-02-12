/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.dicebear.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
      "lh3.google.com",
    ],
  },
};

module.exports = nextConfig;
