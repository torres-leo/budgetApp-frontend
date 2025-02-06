import { Metadata } from 'next';
import Link from 'next/link';

import { publicLinks } from '@/data/publicLinks';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
	title: 'BudgetApp | Reset password',
	description: 'Reset your password to start using the App again',
};

export default function ForgotPassword() {
	return (
		<>
			<h1 className='font-bold text-5xl text-purple-950 mb-8'>Reset your password</h1>

			<ForgotPasswordForm />

			<nav className='mt-8 flex flex-col gap-y-3'>
				<Link
					className='block text-center text-purple-700 hover:underline hover:underline-offset-4'
					href={publicLinks.login}>
					Sign In
				</Link>
			</nav>
		</>
	);
}
