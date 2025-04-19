/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				component: "var(--background-alt)",
				foreground: "var(--foreground)",
				section: "var(--section)",
				accent: "var(--accent)",
				muted: "var(--muted)",
				danger: "var(--danger)",
			},
		},
	},
	plugins: [],
};