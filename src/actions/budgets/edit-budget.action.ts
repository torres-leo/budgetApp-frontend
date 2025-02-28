"use server";

import { revalidateTag } from "next/cache";

import { Budget } from "@/types/budgets";
import { DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/validations";
import { getUserToken } from "@/auth/user-token";

type FormErrors = {
  name?: string[];
  amount?: string[];
  message?: string;
};

type ActionStateType = {
  errors: FormErrors;
  success: string;
};

export async function editBudget(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {
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
  const url = `${process.env.API_URL}/budgets/${budgetId}`;
  const req = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: budget.data.name.trim(), amount: budget.data.amount }),
  });

  const json = await req.json()

  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json);

    return {
      errors: { name: [], amount: [], message: error.message },
      success: '',
    };
  }

  const success = SuccessSchema.parse(json);
  revalidateTag('/all-budgets')

  return {
    errors: { name: [], amount: [], message: '' },
    success,
  };
}