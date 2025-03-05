export default function ExpenseForm() {
  return (
    <>
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
        />
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
        />
      </div>
    </>
  )
}