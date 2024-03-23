/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	distDir: "dist",
	images: {
		unoptimized: true,
	}
};

export default nextConfig;
