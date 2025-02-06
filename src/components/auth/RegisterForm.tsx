'use client';

import SubmitInput from '../ui/SubmitInput';

export default function RegisterForm() {
	return (
		<form className='flex flex-col gap-y-8' noValidate>
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
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Name</label>
				<input type='name' placeholder='John' className='w-full border border-gray-300 p-3 rounded-lg' name='name' />
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Password</label>
				<input
					type='password'
					placeholder='******'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password'
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label className='font-bold text-2xl'>Repeat password</label>
				<input
					id='password_confirmation'
					type='password'
					placeholder='******'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password_confirmation'
				/>
			</div>

			<SubmitInput value='Sign Up' />
		</form>
	);
}
