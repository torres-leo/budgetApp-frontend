import React from 'react'
import Link from 'next/link'

import { Budget } from '@/types/budgets'
import { formatCurrency, formatDate } from '@/utils'
import { privateLinks } from '@/data/privateLinks'
import BudgetMenu from './BudgetMenu'

interface Props {
  budget: Budget
}

function BudgetElementList({ budget }: Props) {
  return (
    <li className="flex justify-between gap-x-6 py-4 px-5 hover:bg-gray-50">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <p className="text-2xl font-bold leading-6 text-gray-900">
            <Link href={`${privateLinks.budgets}/${budget.id}`} >
              {budget.name}
            </Link>
          </p>
          <p className="text-lg font-bold text-amber-500">
            {formatCurrency(Number(budget.amount))}
          </p>
          <p className='text-gray-500  text-sm'>
            Last update: {''}
            <span className='font-bold'>{formatDate(budget.updatedAt)}</span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-x-6">
        <BudgetMenu budgetId={budget.id} />
      </div>
    </li>
  )
}

export default BudgetElementList