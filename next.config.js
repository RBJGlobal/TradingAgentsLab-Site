const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin file-tracing to this project (avoids the stray ~/package-lock.json
  // confusing Next.js about which directory is the workspace root).
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
