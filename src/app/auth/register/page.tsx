import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import { publicLinks } from '@/data/publicLinks';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
	title: 'BudgetApp | Register',
	description: 'Register to the App to start using',
};

export default function Register() {
	return (
		<>
			<h1 className='font-bold text-6xl text-purple-950 lg:text-left mb-2'>Create Account</h1>
			<p className='text-3xl font-semibold mb-8'>
				And manage your
				<span className='text-yellow-500 pb-0.5 border-b-2 border-yellow-500'>Budgets</span>.
			</p>

			<RegisterForm />

			<nav className='mt-8 flex flex-col gap-y-3'>
				<Link
					className='block text-center text-purple-700 hover:underline hover:underline-offset-4'
					href={publicLinks.login}>
					Already have an Account?
				</Link>
				<Link
					className='block text-center text-purple-700 hover:underline hover:underline-offset-4'
					href={publicLinks.forgotPassword}>
					Forgot password?
				</Link>
			</nav>
		</>
	);
}
