'use client';

import { useState, useEffect } from 'react';
import SubmitButton from '../ui/SubmitButton';

export default function LoginForm() {
	const [email, setEmail] = useState('');

	useEffect(() => {
		const storedEmail = sessionStorage.getItem('registeredEmail');
		if (storedEmail) {
			setEmail(storedEmail);
			sessionStorage.removeItem('registeredEmail');
		}
	}, []);

	return (
		<form className='flex flex-col gap-y-8' noValidate>
			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Email</label>

				<input
					id='email'
					type='email'
					placeholder='jonhdoe@example.com'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Password</label>

				<input
					type='password'
					placeholder='*********'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password'
				/>
			</div>

			<SubmitButton value='Sign In' />
		</form>
	);
}
