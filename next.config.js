/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API:"http://ec2-35-87-198-145.us-west-2.compute.amazonaws.com"
  }
}

module.exports = nextConfig
