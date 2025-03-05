"use server";

import { getUserToken } from "@/auth/user-token";
import { privateLinks } from "@/data/privateLinks";
import { Budget } from "@/types/budgets";
import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from "@/validations";
import { revalidatePath } from "next/cache";

type FormErrors = {
  name?: string[];
  amount?: string[];
  message?: string;
};


type ActionStateType = {
  errors: FormErrors;
  success: string;
};

export async function createExpense(budgetId: Budget['id'], prevState: ActionStateType, formData: FormData) {
  console.log("Create expense");
  console.log(budgetId);

  const expenseData = {
    name: formData.get("name"),
    amount: formData.get("amount"),
  }

  const expenseResult = DraftExpenseSchema.safeParse(expenseData)

  if (!expenseResult.success) {
    return {
      errors: { ...expenseResult.error.flatten().fieldErrors },
      success: ''
    }
  }

  const token = getUserToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      name: expenseResult.data.name,
      amount: expenseResult.data.amount
    })
  })

  const json = await req.json()

  if (!req.ok) {
    const error = ErrorResponseSchema.parse(json)

    return {
      errors: { name: [], amount: [], message: error.message },
      success: ''
    }
  }

  const success = SuccessSchema.parse(json)
  revalidatePath(`${privateLinks.budgets}/${budgetId}`)

  return {
    errors: { name: [], amount: [], message: '' },
    success
  }
}