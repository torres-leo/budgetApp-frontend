import { Metadata } from 'next';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';

import { getUserBudgets } from '@/lib/get-user-budgets';
import { privateLinks } from '@/data/privateLinks';
import BudgetElementList from '@/components/budgets/BudgetElementList';

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

    return budgets.map((budget, idx) => <BudgetElementList budget={budget} key={`budget-${idx}-${crypto.randomUUID()}`} />)
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
          className='bg-amber-500/90 hover:bg-amber-600/75 py-2 px-4 rounded-lg text-white font-bold w-full md:w-auto text-center transition-colors duration-100 inline-flex items-center gap-x-1'>
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
