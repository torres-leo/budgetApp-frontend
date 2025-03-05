import { cache } from "react"
import { notFound } from "next/navigation"

import { getUserToken } from "@/auth/user-token"
import { BudgetAPIResponseSchema } from "@/types/budgets"

export const getBudgetById = cache(async (budgetId: string) => {
  const token = getUserToken()
  const url = `${process.env.API_URL}/budgets/${budgetId}`
  const req = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if (!req.ok) {
    notFound()
  }

  const json = await req.json()

  const budget = BudgetAPIResponseSchema.parse(json)
  return budget
})