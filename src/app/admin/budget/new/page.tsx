import Link from 'next/link';
import { IoArrowBackCircle } from 'react-icons/io5';

import { privateLinks } from '@/data/privateLinks';
import BreadcrumbComponent from '@/components/Breadcrumb';
import CreateBudgetForm from '@/components/budgets/CreateBudgetForm';
import type { BreadcrumbElements } from '@/components/Breadcrumb';

const breadcrumbElements: BreadcrumbElements[] = [
	{ text: 'Budgets' },
	{ text: 'New Budget', path: privateLinks.createBudget, currentPage: true },
];

function NewBudgetPage() {
	return (
		<>
			<div className='flex items-center justify-between flex-row-reverse md:flex-row'>
				<BreadcrumbComponent items={breadcrumbElements} />
				<Link
					href='/admin'
					className='bg-amber-500/90 hover:bg-amber-600/75 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center inline-flex items-center gap-x-1 transition-colors duration-100'>
					<IoArrowBackCircle className='text-xl' />
					Back home
				</Link>
			</div>

			<section className=''>
				<div className='w-full md:w-auto'>
					<h1 className='font-black text-4xl text-purple-950 mb-5'>New Budget</h1>
					<p className='text-xl font-bold'>
						Fill the form to create a new {''}
						<span className='text-amber-500'>budget</span>
					</p>
				</div>
			</section>

			<div className='p-10 mt-10  shadow-lg border '>
				<CreateBudgetForm />
			</div>
		</>
	);
}

export default NewBudgetPage;
