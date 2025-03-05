"use client";

import { useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";

function AddExpenseButton() {

  const router = useRouter()

  return (
    <button title="Add a new expense" type="button" className='bg-amber-500/90 hover:bg-amber-600/75 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center inline-flex items-center gap-x-1 transition-colors duration-100' onClick={() => {
      router.push(location.pathname + '?addExpense=true&modal=true')
    }}>

      <FiPlusCircle />
      Expense

    </button>
  )
}

export default AddExpenseButton