/** @type {import('next').NextConfig} */

const nextI18NextConfig = require('./next-i18next.config');

const nextConfig = {  
  ...nextI18NextConfig,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;