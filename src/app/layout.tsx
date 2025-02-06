import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.scss';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

const outfit = Outfit({
	variable: '--font-outfit',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BudgetApp',
	description: 'App to manage your budgets and expenses',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${outfit.variable} ${inter.variable} antialiased`}>{children}</body>
		</html>
	);
}
