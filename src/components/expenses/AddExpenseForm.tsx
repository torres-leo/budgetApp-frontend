import { DialogTitle } from "@headlessui/react";
import SubmitButton from "../ui/SubmitButton";
import ExpenseForm from "./ExpenseForm";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { createExpense } from "@/actions/expenses/create-expense.action";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function AddExpenseForm() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { budgetId } = params

  const [formValues, setFormValues] = useState({
    name: '',
    amount: '',
  });


  const initialState = {
    errors: { name: [], amount: [], message: '' }, success: ''
  }

  const createExpenseToBudget = createExpense.bind(null, +budgetId)
  const [state, formAction] = useFormState(createExpenseToBudget, initialState)

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString())

    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key)
    });
    router.replace(`${pathname}?${hideModal}`)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   if (searchParams.keys().) {
  //     setFormValues({ name: budget.name, amount: budget.amount.toString() });
  //   }
  // }, [searchParams]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
    }

  }, [state])


  return (
    <>
      <DialogTitle
        as="h3"
        className="font-bold text-4xl text-purple-950 mb-5"
      >
        Add Expense
      </DialogTitle>

      <p className="text-xl font-bold mb-8">Fill the form to create a new {''}
        <span className="text-amber-500">expense</span>
      </p>
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-6 border"
        noValidate
        action={formAction}
      >
        {/* <ExpenseForm /> */}

        <div className="space-y-2 mb-3">
          <label htmlFor="name" className="text-sm uppercase font-bold mb-3">
            Expense Name
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100  bg-white rounded-md border-black/10"
            type="text"
            placeholder=""
            name="name"
            onChange={handleChange}
            value={formValues.name}
          />

          {state.errors.name && <ErrorMessage message={state.errors.name[0]} />}
        </div>

        <div className="space-y-2 mb-5">
          <label htmlFor="amount" className="text-sm uppercase font-bold">
            Expense amount
          </label>
          <input
            id="amount"
            className="w-full p-3  border border-gray-100 bg-white rounded-md border-black/10"
            type="number"
            placeholder="1000"
            name="amount"
            onChange={handleChange}
            value={formValues.amount}
          />

          {state.errors.amount && <ErrorMessage message={state.errors.amount[0]} />}
        </div>


        <div className="flex gap-x-5 items-center">
          <button type="button" onClick={closeModal} className="bg-gray-200 hover:bg-gray-300/65 w-full p-3 rounded-lg font-semibold text-lg border border-black/20">Cancel</button>
          <SubmitButton value='Create' />
        </div>
      </form>
    </>
  )
}