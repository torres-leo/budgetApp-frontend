import Link from 'next/link';
import { verifySession } from '@/auth/dal';

import AdminMenu from '@/components/admin/AdminMenu';
import Logo from '@/components/ui/Logo';
import ToastNotify from '@/components/ui/ToastNotify';

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { user } = await verifySession();

	return (
		<>
			<header className='bg-purple-950 py-5'>
				<div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
					<div className='w-96'>
						<Link href={'/admin'}>
							<Logo />
						</Link>
					</div>

					<AdminMenu user={user} />
				</div>
			</header>

			<main className='max-w-5xl mx-auto p-3'>{children}</main>

			<ToastNotify />

			<footer className='py-5 bg-black'>
				<Logo iconSize='sm' textClasses='text-sm' separation='gap-x-1' />
				<p className='text-center text-white text-sm'>&copy; All rights reserved</p>
				<p className='text-center text-white text-xs'>{new Date().getFullYear()}</p>
			</footer>
		</>
	);
}
