'use server';

import { revalidatePath } from 'next/cache';
import { DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from '@/validations';
import { getUserToken } from '@/auth/user-token';
import { privateLinks } from '@/data/privateLinks';

type FormErrors = {
  name?: string[];
  amount?: string[];
  message?: string;
};

type ActionStateType = {
  errors: FormErrors;
  success: string;
};

export async function createBudget(prevState: ActionStateType, formData: FormData) {
  const budget = DraftBudgetSchema.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
  });

  if (!budget.success) {
    return {
      errors: { ...budget.error.flatten().fieldErrors },
      success: '',
    };
  }

  const token = getUserToken();
  const url = `${process.env.API_URL}/budgets`;
  const req = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: budget.data.name.trim(), amount: budget.data.amount }),
  });

  const json = await req.json();

  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json);

    return {
      errors: { name: [], amount: [], message: error.message },
      success: '',
    };
  }

  const success = SuccessSchema.parse(json);
  revalidatePath(privateLinks.admin)

  return {
    errors: { name: [], amount: [], message: '' },
    success,
  };
}
