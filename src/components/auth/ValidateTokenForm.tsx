'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { FaTriangleExclamation } from 'react-icons/fa6';

import { validateToken } from '@/actions/validateToken.action';
import Loader from '../ui/Loader';

type ValidateTokenFormProps = {
	setIsValidToken: Dispatch<SetStateAction<boolean>>;
	token: string;
	setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({ setIsValidToken, token, setToken }: ValidateTokenFormProps) {
	const [isComplete, setIsComplete] = useState(false);
	const [errors, setErrors] = useState('');
	const [loading, setLoading] = useState(false);

	const validateTokenInput = validateToken.bind(null, token);

	const [state, dispatch] = useFormState(validateTokenInput, {
		errors: [],
		success: '',
	});

	useEffect(() => {
		if (isComplete) {
			setLoading(true);
			dispatch();
		}
	}, [isComplete]);

	const handleChange = (token: string) => {
		setToken(token);
		setErrors('');
		setIsComplete(false);
	};

	const handleComplete = () => {
		setIsComplete(true);
	};

	useEffect(() => {
		if (state.errors.length || state.success) {
			setLoading(false);
		}

		if (state.errors) {
			setErrors(state.errors[0]);

			state.errors.forEach((e) => {
				toast.error(e);
			});
		}

		if (state.success) {
			toast.success(state.success);
			setIsValidToken(true);
		}
	}, [state]);

	const renderInputs = () => {
		const inputs = [];
		for (let i = 1; i <= 6; i++) {
			inputs.push(
				<PinInputField
					key={`input-${i}`}
					className='size-9 border border-gray-700/40 rounded-md placeholder-white text-center shadow-xl shadow-black/5'
				/>
			);
		}
		return inputs;
	};

	const renderErrorMessage = () => {
		if (errors) {
			return (
				<div className='flex justify-center items-center gap-x-2 w-3/4 mx-auto bg-red-500/90 rounded-lg p-1.5'>
					<FaTriangleExclamation className='text-white text-lg' />
					<p className=' text-white text-lg font-medium'>{state.errors[0]}</p>
				</div>
			);
		}
	};

	return (
		<>
			<p className='text-2xl font-medium'>
				Enter the code you received
				<span className='text-amber-500 '> by email</span>
			</p>

			<div className='flex justify-center gap-5 my-10'>
				<PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
					{renderInputs()}
				</PinInput>
			</div>

			{renderErrorMessage()}
			{loading && <Loader type='ring2' color='#c44fc4' size='40' speed='1' />}
		</>
	);
}
