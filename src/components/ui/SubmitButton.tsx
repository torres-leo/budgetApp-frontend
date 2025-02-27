'use client';

import { useFormStatus } from 'react-dom';
import Loader from './Loader';

interface Props {
  value: string;
  className?: string;
  placeholderLoading?: string;
}

function SubmitButton({ value, className, placeholderLoading = 'Loading' }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={`bg-purple-900 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-semibold text-xl cursor-pointer inline-flex items-center justify-center gap-x-1.5 ${className ?? ''
        } disabled:cursor-not-allowed disabled:opacity-70`}
      disabled={pending}>
      {!pending ? (
        value
      ) : (
        <>
          {placeholderLoading}
          <Loader type='ring2' color='white' size='25' />
        </>
      )}
    </button>
  );
}

export default SubmitButton;
