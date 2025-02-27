import { Metadata } from 'next';
import Link from 'next/link';
import { FiPlusCircle } from 'react-icons/fi';
import { privateLinks } from '@/data/privateLinks';

export const metadata: Metadata = {
  title: 'BudgetApp | Budgets',
  description: 'BudgetApp administration panel. Where you can manage all your budgets in one click 🚀',
};

function page() {
  return (
    <>
      <div className='flex flex-col-reverse md:flex-row md:justify-between items-center pt-10'>
        <div className='w-full md:w-auto'>
          <h1 className='font-black text-4xl text-purple-950 mb-3'>Budgets</h1>
          <p className='text-xl font-bold'>
            Manage your {''}
            <span className='text-amber-500'>Budgets</span>
          </p>
        </div>

        <Link
          href={`/admin/${privateLinks.createBudget}`}
          className='bg-amber-500/90 hover:bg-amber-600/75 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center transition-colors duration-100 inline-flex items-center gap-x-1'>
          <FiPlusCircle />
          Add
        </Link>
      </div>
    </>
  );
}

export default page;
