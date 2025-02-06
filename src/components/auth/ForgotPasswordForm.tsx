'use client';

import SubmitInput from '../ui/SubmitInput';

export default function ForgotPasswordForm() {
	return (
		<form noValidate>
			<div className='flex flex-col gap-1 mb-10'>
				<label className='font-bold text-2xl'>Email</label>

				<input
					type='email'
					placeholder='jonhdoe@example.com'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='email'
				/>
			</div>

			<SubmitInput value='Send Email' />
		</form>
	);
}
