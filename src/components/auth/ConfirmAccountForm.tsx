'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';
import { confirmAccount } from '@/actions/confirm-account.action';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

function ConfirmAccountForm() {
	const router = useRouter();
	const [token, setToken] = useState('');
	const [isComplete, setIsComplete] = useState(false);

	const confirmAccountWithToken = confirmAccount.bind(null, token);

	const initialState = { errors: [], success: '' };
	const [state, formAction] = useFormState(confirmAccountWithToken, initialState);

	useEffect(() => {
		if (isComplete) {
			formAction();
		}
	}, [isComplete]);

	useEffect(() => {
		if (state.errors.length > 0) {
			state.errors.forEach((error) => {
				toast.error(error);
			});
		}

		if (state.success) {
			toast.success(state.success, {
				onClose: () => {
					router.push('/auth/login');
				},
			});
		}
	}, [state]);

	const handleChange = (token: string) => {
		setIsComplete(false);
		setToken(token);
	};

	const handleComplete = () => {
		setIsComplete(true);
	};

	const renderInputs = () => {
		const inputs = [];
		for (let i = 1; i <= 6; i++) {
			inputs.push(
				<PinInputField
					key={`input-${i}`}
					className='size-9 border border-gray-700/40 rounded-md placeholder-white text-center shadow-xl shadow-black/15'
				/>
			);
		}
		return inputs;
	};

	return (
		<div className='flex justify-center gap-x-6'>
			<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
				{renderInputs()}
			</PinInput>
		</div>
	);
}

export default ConfirmAccountForm;
