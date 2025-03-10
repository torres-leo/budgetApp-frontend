'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Budget } from '@/types/budgets';
import { createBudget } from '@/actions/budgets/create-budget.action';
import { editBudget } from '@/actions/budgets/edit-budget.action';
import { privateLinks } from '@/data/privateLinks';
import ErrorMessage from '../ui/ErrorMessage';
import SubmitButton from '../ui/SubmitButton';
import Link from 'next/link';

type StateForm = {
  budget?: Budget
}

export default function BudgetForm({ budget }: StateForm) {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: '',
    amount: '',
  });

  const initialState = {
    errors: { name: [], amount: [], message: '' },
    success: '',
  };

  const formStateAction = budget ? editBudget.bind(null, budget.id) : createBudget;
  const [state, formAction] = useFormState(formStateAction, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (budget) {
      setFormValues({ name: budget.name, amount: budget.amount.toString() });
    }
  }, [budget]);

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
      toast.success(state.success);
      router.push(privateLinks.admin);
    }
  }, [state]);


  return (
    <form className='w-full relative' noValidate action={formAction}>
      <div className='space-y-2 mb-3'>
        <label htmlFor='name' className='text-sm uppercase font-bold'>
          Budget Name
        </label>
        <input
          id='name'
          className='w-full p-3  border border-black/10 bg-slate-100 font-medium rounded-md'
          type='text'
          placeholder='eg: Gaming Setup'
          name='name'
          onChange={handleChange}
          value={formValues.name}
        />

        {state.errors.name && <ErrorMessage message={state.errors.name[0]} />}
      </div>

      <div className='space-y-2 mb-5'>
        <label htmlFor='amount' className='text-sm uppercase font-bold'>
          Budget amount
        </label>
        <input
          type='number'
          id='amount'
          className='w-full p-3  border border-black/10 bg-slate-100 font-medium rounded-md'
          placeholder='1200'
          name='amount'
          onChange={handleChange}
          value={formValues.amount}
        />
        {state.errors.amount && <ErrorMessage message={state.errors.amount[0]} />}
      </div>

      <div className='flex justify-center items-center gap-x-5 w-full'>
        <Link href={privateLinks.admin} className='w-full text-center bg-gray-100 hover:bg-gray-200 transition-colors duration-100 py-3 rounded-lg text-lg font-medium border border-black/20'>
          Cancel
        </Link>

        <SubmitButton
          value={`${budget ? "Update Budget" : "Create Budget"}`}
          placeholderLoading={`${budget ? "Updating Budget" : "Creating Budget"}`} />
      </div>
    </form>
  );
}
