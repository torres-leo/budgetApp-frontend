import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				auth: "url('/grafico.svg')",
			},
			// backgroundSize: { '30': '30rem' },
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			fontFamily: {
				inter: ['var(--font-inter)'],
				outfit: ['var(--font-outfit)'],
			},
		},
	},
	plugins: [],
} satisfies Config;
