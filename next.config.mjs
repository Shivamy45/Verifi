/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.mos.cms.futurecdn.net",
			},
			{
				protocol: "https",
				hostname: "**.gnews.io", // add others as needed
			},
		],
	},
};

export default nextConfig;
