import { useFormState } from 'react-dom';
import { resetPassword } from '@/actions/reset-password.action';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { publicLinks } from '@/data/publicLinks';

export default function ResetPasswordForm({ token }: { token: string }) {
	const router = useRouter();
	const [formValues, setFormValues] = useState({
		password: '',
		password_confirmation: '',
	});

	const initialState = {
		errors: [],
		success: '',
	};
	const resetPasswordWithToken = resetPassword.bind(null, token);
	const [state, formAction] = useFormState(resetPasswordWithToken, initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((e) => {
				toast.error(e);
			});
		}

		if (state.success) {
			toast.success(state.success, {
				onClose: () => {
					router.push(publicLinks.login);
				},
				onClick: () => {
					router.push(publicLinks.login);
				},
			});
		}
	}, [state]);

	return (
		<form className=' mt-14 space-y-5' noValidate action={formAction}>
			<div className='flex flex-col gap-5'>
				<label className='font-bold text-2xl'>Password</label>

				<input
					type='password'
					placeholder='********'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password'
					onChange={handleChange}
					value={formValues.password}
				/>
			</div>

			<div className='flex flex-col gap-5'>
				<label className='font-bold text-2xl'>Re-type Password</label>

				<input
					id='password_confirmation'
					type='password'
					placeholder='********'
					className='w-full border border-gray-300 p-3 rounded-lg'
					name='password_confirmation'
					onChange={handleChange}
					value={formValues.password_confirmation}
				/>
			</div>

			<input
				type='submit'
				value='Update Password'
				// disabled={!formValues.password && !formValues.password_confirmation}
				className='bg-purple-900 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-bold text-xl cursor-pointer block transition-colors delay-100'
			/>
		</form>
	);
}
