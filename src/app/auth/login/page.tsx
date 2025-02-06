import { Metadata } from 'next';
import Link from 'next/link';

import { publicLinks } from '@/data/publicLinks';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
	title: 'BudgetApp | Login',
	description: 'Login into the App to start using',
};

export default function Login() {
	return (
		<>
			<h1 className='font-bold text-6xl text-purple-950 mb-8'>Sign In</h1>

			<LoginForm />

			<nav className='mt-8 flex flex-col gap-y-3'>
				<Link
					className='block text-center text-purple-700 hover:underline hover:underline-offset-4'
					href={publicLinks.forgotPassword}>
					Forgot password?
				</Link>
				<Link
					className='block text-center text-purple-700 hover:underline hover:underline-offset-4'
					href={publicLinks.register}>
					Create new Account
				</Link>
			</nav>
		</>
	);
}
