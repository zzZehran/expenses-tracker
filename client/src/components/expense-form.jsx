import React from "react";

export default function ExpenseForm({ loadingUpdater }) {
  function addExpense(formData) {
    loadingUpdater(true);
    const name = formData.get("expense-name");
    const amount = formData.get("expense-amount");
    const category = formData.get("expense-category");

    fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount, category }),
    }).then((response) => loadingUpdater(false));
  }

  return (
    <form action={addExpense} className="flex justify-between space-x-1 mb-5">
      <div className="space-x-2">
        <label className="text-lg" htmlFor="expense-name">
          Expense
        </label>
        <input
          className="bg-zinc-100 rounded-sm px-2 py-1 w-40"
          id="expense-name"
          type="text"
          placeholder="Vegetables"
          name="expense-name"
        />
      </div>
      <div className="space-x-2">
        <label className="text-lg" htmlFor="expense-amount">
          Amount
        </label>
        <input
          className="bg-zinc-100 rounded-sm px-2 py-1 w-30"
          id="expense-amount"
          type="number"
          placeholder="100"
          name="expense-amount"
        />
      </div>
      <div className="space-x-2">
        <label className="text-lg" htmlFor="expense-category">
          Category
        </label>
        <select
          className="bg-zinc-100 rounded-sm px-2 py-1 w-30"
          id="expense-category"
          name="expense-category"
          defaultValue=""
        >
          <option value="" disabled>
            --choose--
          </option>
          <option value="personal">Personal</option>
          <option value="groceries">Groceries</option>
          <option value="misc">Misc.</option>
        </select>
      </div>
      <div>
        <button className="rounded-sm px-2 py-1 w-30 bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer">
          Add
        </button>
      </div>
    </form>
  );
}
