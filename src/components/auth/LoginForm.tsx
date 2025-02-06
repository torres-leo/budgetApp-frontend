'use client';

import SubmitInput from '../ui/SubmitInput';

export default function LoginForm() {
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

			<SubmitInput value='Sign In' />
		</form>
	);
}
