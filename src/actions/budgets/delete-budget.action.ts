"use server"

import { revalidatePath } from "next/cache"
import { Budget } from "@/types/budgets"
import { ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/validations"
import { getUserToken } from "@/auth/user-token"
import { privateLinks } from "@/data/privateLinks"

type ActionStateType = {
  errors: string[]
  success: string
}

export async function deleteBudget(budgetId: Budget["id"], prevState: ActionStateType, formData: FormData) {
  const password = formData.get("password")

  const currentPassword = PasswordValidationSchema.safeParse(password)

  if (!currentPassword.success) {
    return {
      errors: currentPassword.error.errors.map((e) => e.message),
      success: ''
    }
  }

  const token = getUserToken()
  const checkPasswordURL = `${process.env.API_URL}/auth/check-password`
  const checkPasswordReq = await fetch(checkPasswordURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      password: currentPassword.data
    })
  })

  const jsonPassword = await checkPasswordReq.json();

  if (!checkPasswordReq.ok) {
    const error = ErrorResponseSchema.parse(jsonPassword);

    return {
      errors: [error.message],
      success: ""
    }
  }

  const deleteBudgetURL = `${process.env.API_URL}/budgets/${budgetId}`
  const deleteBudgetReq = await fetch(deleteBudgetURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const deleteBudgetJson = await deleteBudgetReq.json()

  if (!deleteBudgetReq.ok) {
    const error = ErrorResponseSchema.parse(deleteBudgetJson);

    return {
      errors: [error.message],
      success: ""
    }
  }

  const success = SuccessSchema.parse(deleteBudgetJson)
  revalidatePath(privateLinks.admin)

  return {
    errors: [],
    success
  }
}