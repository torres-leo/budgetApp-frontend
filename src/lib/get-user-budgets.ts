import { BudgetsAPIResponseSchema } from "@/types/budgets";
import { getUserToken } from "@/auth/user-token";

export async function getUserBudgets() {
  const token = getUserToken()

  const url = `${process.env.API_URL}/budgets`

  const req = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await req.json()
  const budgets = BudgetsAPIResponseSchema.parse(json)

  return budgets
}