import React from 'react'
import { Metadata } from 'next';
import Link from 'next/link';
import { IoArrowBackCircle } from 'react-icons/io5'

import { getBudgetById } from '@/lib/get-budget-by-id';
import { privateLinks } from '@/data/privateLinks';
import BreadcrumbComponent, { BreadcrumbElements } from '@/components/Breadcrumb'
import BudgetForm from '@/components/budgets/BudgetForm';

export async function generateMetadata({ params }: { params: { budgetId: string } }): Promise<Metadata> {
  const { budgetId } = params
  const budget = await getBudgetById(budgetId)

  return {
    title: `BudgetApp | ${budget.name}`,
    description: `This page allows to update data from ${budget.name}`
  }
}


export async function EditBudgetPage({ params }: { params: { budgetId: string } }) {
  const { budgetId } = params
  const budget = await getBudgetById(budgetId)

  const breadcrumbElements: BreadcrumbElements[] = [
    { text: 'Budgets' },
    { text: 'Edit', currentPage: true },
  ];


  return (
    <>
      <div className='flex items-center justify-between flex-row-reverse md:flex-row'>
        <BreadcrumbComponent items={breadcrumbElements} />
        <Link
          href={privateLinks.admin}
          className='bg-amber-500/90 hover:bg-amber-600/75 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center inline-flex items-center gap-x-1 transition-colors duration-100'>
          <IoArrowBackCircle className='text-xl' />
          Back home
        </Link>
      </div>


      <div className='w-full md:w-auto'>
        <h1 className='font-black text-4xl text-purple-950 my-5'>
          Update Budget:
          <span className='ms-10 underline underline-offset-8'>{budget.name}</span>
        </h1>
        <p className="text-xl font-bold">Update the fields from your {''}
          <span className="text-amber-500">Budget</span>
        </p>
      </div>


      <div className='p-10 mt-10  shadow-lg border '>
        <BudgetForm budget={budget} />
      </div>

    </>
  )
}

export default EditBudgetPage