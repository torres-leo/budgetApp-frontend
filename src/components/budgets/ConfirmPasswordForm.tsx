import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';

import { deleteBudget } from '@/actions/budgets/delete-budget.action';
import { privateLinks } from '@/data/privateLinks';
import ErrorMessage from '../ui/ErrorMessage';
import SubmitButton from '../ui/SubmitButton';

export default function ConfirmPasswordForm() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = +searchParams.get("deleteBudget")!


  const initialActionState = {
    errors: [],
    success: ''
  }

  const actionWithBudget = deleteBudget.bind(null, budgetId)
  const [state, formAction] = useFormState(actionWithBudget, initialActionState)

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    hideModal.delete('deleteBudget');
    router.replace(`${pathname}?${hideModal}`);
  };

  useEffect(() => {
    if (state.errors[0] === "Invalid action") {
      toast.error(`You don't have any budget with ID: ${budgetId}`)
    }

    if (state.success) {
      toast.success(state.success, {
        onClose: () => router.push(privateLinks.admin),
        onClick: () => router.push(privateLinks.admin)
      })
      closeModal()
    }

  }, [state])

  return (
    <>
      <DialogTitle as='h3' className='font-bold text-4xl text-purple-950 mb-5'>
        Delete Budget
      </DialogTitle>
      <p className='text-xl font-bold'>
        Type your password to {''}
        <span className='text-amber-500'>delete a Budget {''}</span>
      </p>
      <p className='text-gray-600 text-xs mb-5'>You cannot recover a budget and its expenses</p>
      <form className='space-y-5' noValidate action={formAction}>
        <div className='flex flex-col gap-2'>
          <input
            id='password'
            type='password'
            placeholder='********'
            className='w-full border border-gray-300 p-3 rounded-lg'
            name='password'
          />
          {state.errors && <ErrorMessage message={state.errors[0]} className='text-xs ms-2' />}
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <button
            type='button'
            className='p-3 rounded-lg text-black font-semibold cursor-pointer transition-colors border bg-gray-100 hover:bg-gray-200'
            onClick={closeModal}>
            Cancelar
          </button>

          <SubmitButton
            value='Delete'
            className='border border-transparent bg-red-500 w-full p-3 rounded-lg font-semibold text-white cursor-pointer transition-colors hover:bg-red-400 hover:border-red-500'
          />
        </div>
      </form>
    </>
  );
}
