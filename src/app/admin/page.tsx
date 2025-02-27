import { Metadata } from 'next';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';

import { privateLinks } from '@/data/privateLinks';
import { getUserBudgets } from '@/lib/get-user-budgets';
import { formatCurrency, formatDate } from '@/utils';
import BudgetMenu from '@/components/budgets/BudgetMenu';

export const metadata: Metadata = {
  title: 'BudgetApp | Budgets',
  description: 'BudgetApp administration panel. Where you can manage all your budgets in one click 🚀',
};

export async function AdminPage() {

  const budgets = await getUserBudgets()

  const showsUserBudgets = () => {
    if (!budgets.length) {
      return (
        <p className='font-semibold text-lg'>There&apos;s no budgets registered yet, {''}
          <Link href={privateLinks.createBudget} className='text-amber-500 font-medium hover:underline hover:underline-offset-2'>
            create one
          </Link>
          .
        </p>
      )
    }

    return budgets.map((budget, idx) => (
      <li key={budget.id + idx} className="flex justify-between gap-x-6 py-4 px-5 hover:bg-gray-50">
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
    ))
  }

  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center pt-10 mb-10'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-purple-950 mb-3'>Budgets</h1>
          <p className='text-xl font-bold'>
            Manage your {''}
            <span className='text-amber-500'>Budgets</span>
          </p>
        </div>

        <Link
          href={privateLinks.createBudget}
          className='bg-amber-500/90 hover:bg-amber-600/75 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center transition-colors duration-100 inline-flex items-center gap-x-1'>
          <FiPlusCircle />
          Add
        </Link>
      </div>

      <ul role="list" className={`divide-y divide-gray-300 border shadow-lg ${!budgets.length ? "py-5 flex flex-col justify-center items-center gap-y-1" : ""}`}>
        {showsUserBudgets()}
      </ul>

    </>
  );
}

export default AdminPage;
