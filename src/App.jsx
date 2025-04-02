import { useState } from "react";
function App() {
  const [expenses, setExpenses] = useState([]);

  function handleForm(formData) {
    const name = formData.get("expense-name");
    const amount = formData.get("expense-amount");
    const category = formData.get("expense-category");

    if (!name || !amount || !category) {
      // throw new Error("Empty fields not allowed");
      return alert("Empty fields not allowed!");
    }

    const expense = {
      name,
      amount,
      category,
    };
    setExpenses((prevValue) => [...prevValue, expense]);
  }
  console.log(expenses);

  let total = expenses.reduce((acc, el) => acc + parseFloat(el.amount), 0);

  return (
    <>
      <div className="container mx-auto my-5">
        <form
          action={handleForm}
          className="flex justify-evenly space-x-1 mb-5"
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
            <button className="rounded-sm px-2 py-1 w-30 bg-blue-400 text-white">
              Add
            </button>
          </div>
        </form>
        <hr />
        <ul>
          {expenses.map((el, index) => (
            <li
              key={index}
              className="text-lg p-3 px-8 bg-slate-200 flex justify-between"
            >
              <span className="text-xl">
                {el.name}
                <sub className="block text-xs">{el.category}</sub>
              </span>
              <span className="flex items-center font-bold text-green-600 text-xl">
                +{el.amount}
              </span>
            </li>
          ))}
        </ul>
        <hr />
        <h2 className="mt-3 text-lg">
          <span className="font-bold"> Total:</span> {total}
        </h2>
      </div>
    </>
  );
}

export default App;
