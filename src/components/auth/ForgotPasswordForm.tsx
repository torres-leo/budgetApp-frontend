'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

import { forgotPassword } from '@/actions/forgot-password.action';
import SubmitButton from '../ui/SubmitButton';
import SuccessMessage from '../ui/SuccessMessage';
import Loader from '../ui/Loader';

export default function ForgotPasswordForm() {
  const initialState = {
    errors: [],
    success: '',
  };

  const [state, formAction] = useFormState(forgotPassword, initialState);

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((e) => {
        toast.error(e);
      });
    }

    if (state.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <form noValidate action={formAction}>
      <div className='flex flex-col gap-1 mb-5'>
        <label className='font-bold text-2xl'>Email</label>

        <input
          type='email'
          placeholder='johndoe@example.com'
          className='w-full border border-gray-300 p-3 rounded-lg'
          name='email'
        />
        {state.success && (
          <SuccessMessage className='my-1 p-2 bg-green-200 w-full rounded-xl font-medium text-center text-black text-sm'>
            ✅{state.success}
          </SuccessMessage>
        )}
      </div>

      <Loader type='ring2' />

      <SubmitButton value='Send Email' />
    </form>
  );
}
