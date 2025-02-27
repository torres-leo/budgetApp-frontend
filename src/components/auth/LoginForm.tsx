'use client';

import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { authenticateUser } from '@/actions/authenticate-user.action';
import { useFormState } from 'react-dom';
import ErrorMessage from '../ui/ErrorMessage';
import SubmitButton from '../ui/SubmitButton';

export default function LoginForm() {
	const [email, setEmail] = useState('');

	const initialState = {
		errors: { email: [], password: [], message: '' },
	};

	const [state, formAction] = useFormState(authenticateUser, initialState);

	useEffect(() => {
		const storedEmail = sessionStorage.getItem('registeredEmail');
		if (storedEmail) {
			setEmail(storedEmail);
			sessionStorage.removeItem('registeredEmail');
		}
	}, []);

	useEffect(() => {
		if (state.errors.message) {
			toast.error(state.errors.message);
		}
	}, [state]);

	return (
		<form className='flex flex-col gap-y-8' action={formAction} noValidate>
			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Email</label>

				<input
					id='email'
					type='email'
					placeholder='johndoe@example.com'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
				/>
				{state.errors.email && <ErrorMessage message={state.errors.email[0]} />}
			</div>
			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Password</label>

				<input
					type='password'
					placeholder='*********'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password'
				/>
				{state.errors.password && <ErrorMessage message={state.errors.password[0]} />}
			</div>

			<SubmitButton value='Sign In' className='inline-flex items-center justify-center gap-x-2' />
		</form>
	);
}
