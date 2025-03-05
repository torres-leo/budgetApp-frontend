import { Metadata } from 'next';

import { getBudgetById } from '@/lib/get-budget';
import BreadcrumbComponent, { BreadcrumbElements } from '@/components/Breadcrumb';
import AddExpenseButton from '@/components/expenses/AddExpenseButton';
import ExpenseModalContainer from '@/components/expenses/ExpenseModalContainer';

export async function generateMetadata({ params }: { params: { budgetId: string } }): Promise<Metadata> {
  const { budgetId } = params;
  const budget = await getBudgetById(budgetId);

  return {
    title: `BudgetApp | ${budget.name}`,
    description: `This page allows to view and manage all the expenses for your budget: ${budget.name}`,
  };
}

export async function ViewBudgetPage({ params }: { params: { budgetId: string } }) {
  const { budgetId } = params;
  const budget = await getBudgetById(budgetId);

  const breadcrumbElements: BreadcrumbElements[] = [{ text: 'Budgets' }, { text: budget.name, currentPage: true }];

  return (
    <>
      <BreadcrumbComponent items={breadcrumbElements} />

      <div className='flex justify-between items-center'>
        <div>
          <h1 className='font-black text-4xl text-purple-950 mb-4'>{budget.name}</h1>
          <p className='text-xl font-bold'>
            Manage your {''} <span className='text-amber-500'>expenses</span>
          </p>
        </div>
        <AddExpenseButton />
      </div>

      <ExpenseModalContainer />
    </>
  );
}

export default ViewBudgetPage;
