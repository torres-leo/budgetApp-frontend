'use client';

import { registerUser } from '@/actions/create-account.action';
import SubmitButton from '../ui/SubmitButton';
import { useFormState } from 'react-dom';
import SuccessMessage from '../ui/SuccessMessage';
import ErrorMessage from '../ui/ErrorMessage';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'nextjs-toast-notify';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
	const initialState = {
		errors: { name: [], email: [], password: [], password_confirmation: [], general: '' },
		success: '',
		values: { email: '' },
	};
	const [generalError, setGeneralError] = useState('');
	const [state, formAction, pending] = useFormState(registerUser, initialState);
	const router = useRouter();

	const ref = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.errors.general) {
			setGeneralError(state.errors.general);

			const timer = setTimeout(() => {
				setGeneralError('');
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [state.errors.general]);

	useEffect(() => {
		if (state.success) {
			toast.success('User created succesfully', {
				duration: 5000,
				progress: true,
				position: 'bottom-center',
				transition: 'bounceIn',
				sound: true,
			});

			if (state.values?.email) {
				sessionStorage.setItem('registeredEmail', state.values.email);
			}

			ref.current?.reset();

			setTimeout(() => {
				router.push('/auth/login');
			}, 2500);
		}
	}, [state.success]);

	return (
		<form className='flex flex-col gap-y-8' action={formAction} ref={ref}>
			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Name</label>
				<input type='text' placeholder='John' className='w-full border border-gray-300 p-3 rounded-lg' name='name' />
				{state.errors.name && <ErrorMessage message={state.errors.name[0]} />}
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl' htmlFor='email'>
					Email
				</label>
				<input
					id='email'
					type='email'
					placeholder='johndoe@example.com'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='email'
				/>
				{state.errors.email && <ErrorMessage message={state.errors.email[0]} />}
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Password</label>
				<input
					type='password'
					placeholder='******'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password'
				/>
				{state.errors.password && <ErrorMessage message={state.errors.password[0]} />}
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Retype password</label>
				<input
					id='password_confirmation'
					type='password'
					placeholder='******'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password_confirmation'
				/>
				{state.errors.password_confirmation && <ErrorMessage message={state.errors.password_confirmation[0]} />}
			</div>

			<SubmitButton value='Sign Up' disabled={pending} />

			{state.success && <SuccessMessage className='text-xl'>{state.success}</SuccessMessage>}
			{generalError && (
				<ErrorMessage
					message={generalError}
					className='text-center bg-red-600 p-2 rounded-lg text-white font-bold text-lg'
				/>
			)}
		</form>
	);
}
