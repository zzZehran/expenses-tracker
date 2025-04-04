import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/expenses", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setExpenses(data.allExpenses));
  }, [loading]);

  function addExpense(formData) {
    setLoading(true);
    const name = formData.get("expense-name");
    const amount = formData.get("expense-amount");
    const category = formData.get("expense-category");

    fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, amount, category }),
    }).then((response) => setLoading(false));
  }

  function handleFilter(event) {
    const expensesFilter = event.target.value;
    setFilter(expensesFilter);
  }

  function clearAll() {
    setExpenses([]);
  }

  const filteredExpenses = expenses.filter(
    (el) => el.category == filter || filter == "all"
  );

  let total = filteredExpenses.reduce((acc, el) => acc + el.amount, 0);

  function deleteExpense(id) {
    setLoading(true);
    fetch("http://localhost:3000/api/expenses", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((response) => setLoading(false));
  }

  return (
    <>
      <div className="container mx-auto my-5">
        <form
          action={addExpense}
          className="flex justify-between space-x-1 mb-5"
        >
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
        <div className="flex justify-end mb-2">
          <label htmlFor="filter" className="mr-3 pt-1">
            Filter
          </label>
          <select
            className="bg-zinc-100 rounded-sm px-2 py-1 w-28"
            id="filter"
            name="expenses-filter"
            defaultValue=""
            onChange={handleFilter}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="groceries">Groceries</option>
            <option value="misc">Misc.</option>
          </select>
        </div>
        <hr />
        <ul>
          {filteredExpenses.map((el) => (
            <li
              key={el._id}
              className="text-lg p-3 px-8 bg-slate-200 flex justify-between"
            >
              <span className="text-xl">
                {el.name}
                <sub className="block text-xs">{el.category}</sub>
              </span>
              <div className="flex items-center space-x-5">
                <span className="font-bold text-green-600 text-2xl">
                  +{el.amount}
                </span>
                <button
                  className="rounded-sm p-1 bg-red-400 text-white text-xs hover:bg-red-500 hover:cursor-pointer"
                  onClick={() => deleteExpense(el._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-3 stroke-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <h2 className="mt-3 text-lg">
          <div className="flex justify-between">
            <span className="font-bold text-2xl"> Total: ${total}</span>
            <button
              className="rounded-sm px-2 w-30 bg-red-400 text-white hover:bg-red-500 hover:cursor-pointer"
              onClick={clearAll}
            >
              Clear all
            </button>
          </div>
        </h2>
        {loading && (
          <div className="flex justify-center">
            <span className=" font-bold text-md text-green-700 bg-green-200 px-4 py-2 rounded-md">
              Loading....
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
