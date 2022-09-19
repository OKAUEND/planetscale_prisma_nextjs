/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["ts,tsx"],
  build: {
    env: {
      TEST_ENV: process.env.TEST_ENV,
    },
  },
  env: {
    TEST_ENV: process.env.TEST_ENV,
  },
};

module.exports = nextConfig;
