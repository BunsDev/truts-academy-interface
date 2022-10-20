/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API: "http://ec2-35-87-198-145.us-west-2.compute.amazonaws.com",
    TRUTS_API: "https://7cjecbsr4a.us-west-2.awsapprunner.com"
  }
}

module.exports = nextConfig
