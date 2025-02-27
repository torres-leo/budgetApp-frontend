'use client';

import { createBudget } from '@/actions/budgets/create-budget.action';
import { useFormState } from 'react-dom';
import SubmitButton from '../ui/SubmitButton';
import ErrorMessage from '../ui/ErrorMessage';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { privateLinks } from '@/data/privateLinks';

export default function CreateBudgetForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: '',
    amount: '',
  });

  const initialState = {
    errors: { name: [], amount: [], message: '' },
    success: '',
  };

  const [state, formAction] = useFormState(createBudget, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (state.errors) {
      state.errors.amount?.forEach((e) => {
        toast.error(e);
      });
      state.errors.name?.forEach((e) => {
        toast.error(e);
      });

      if (state.errors.message) {
        toast.error(state.errors.message);
      }
    }

    if (state.success) {
      setFormValues({ amount: '', name: '' });
      toast.success(state.success, {
        onClose: () => {
          router.push(privateLinks.admin);
        },
      });
    }
  }, [state]);

  return (
    <form className='space-y-3' noValidate action={formAction}>
      <div className='space-y-3'>
        <label htmlFor='name' className='text-sm uppercase font-bold'>
          Budget Name
        </label>
        <input
          id='name'
          className='w-full p-3  border border-gray-100 bg-slate-100'
          type='text'
          placeholder='eg: Gaming Setup'
          name='name'
          onChange={handleChange}
          value={formValues.name}
        />

        {state.errors.name && <ErrorMessage message={state.errors.name[0]} />}
      </div>

      <div className='space-y-3'>
        <label htmlFor='amount' className='text-sm uppercase font-bold'>
          Budget amount
        </label>
        <input
          type='number'
          id='amount'
          className='w-full p-3  border border-gray-100 bg-slate-100'
          placeholder='1200'
          name='amount'
          onChange={handleChange}
          value={formValues.amount}
        />
        {state.errors.amount && <ErrorMessage message={state.errors.amount[0]} />}
      </div>

      <SubmitButton value='Create Budget' placeholderLoading='Creating budget' />
    </form>
  );
}
