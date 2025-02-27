import { z } from "zod"

// This is for a budget
export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
})

// This is for all budgets
export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema)
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
