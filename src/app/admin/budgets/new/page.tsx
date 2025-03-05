import { privateLinks } from '@/data/privateLinks';
import BreadcrumbComponent from '@/components/Breadcrumb';
import BudgetForm from '@/components/budgets/BudgetForm';
import type { BreadcrumbElements } from '@/components/Breadcrumb';

const breadcrumbElements: BreadcrumbElements[] = [
  { text: 'Budgets' },
  { text: 'New Budget', path: privateLinks.createBudget, currentPage: true },
];

function NewBudgetPage() {
  return (
    <>
      <BreadcrumbComponent items={breadcrumbElements} />


      <section >
        <div className='w-full mb-8'>
          <h1 className='font-black text-4xl text-purple-950 mb-4'>New Budget</h1>
          <p className='text-xl font-bold'>
            Fill the form to create a new {''}
            <span className='text-amber-500'>budget</span>
          </p>
        </div>

        <div className='p-10 shadow-lg border rounded-md'>
          <BudgetForm />
        </div>
      </section>
    </>
  );
}

export default NewBudgetPage;
