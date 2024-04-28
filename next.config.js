// Import the next-remove-imports package
const removeImports = require("next-remove-imports")();

// Define your Next.js configuration
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
		return [
		  {
			source: '/',
			destination: '/reg',
			permanent: true,
		  },
		  ]
	  },
};

// Apply the removeImports transformation to the nextConfig
module.exports = removeImports(nextConfig);
