import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

import ExpenseForm from "../components/expense-form";
import Filter from "../components/filter";
import ExpensesList from "../components/expenses-list";
import TotalClearAll from "../components/total-clearall";
import { fetchExpenses, fetchDelExpense, fetchDelAll } from "../services/api";

function Home({ loginUpdater, user }) {
  // console.log(user);

  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  function logout() {
    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        loginUpdater(false);
        alert(data.message);
        navigate("/login");
      });
  }

  useEffect(() => {
    const fetch = async () => {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    };
    fetch();
  }, [isLoading]);

  const filteredExpenses = expenses.filter(
    (el) => el.category == filter || filter == "all"
  );

  let total = filteredExpenses.reduce((acc, el) => acc + el.amount, 0);

  async function deleteExpense(id) {
    setIsLoading(true);
    const response = await fetchDelExpense(id);
    if (!response.ok) {
      alert("Something went wrong!");
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  async function deleteAll() {
    setIsLoading(true);
    const response = await fetchDelAll();
    if (!response.ok) {
      alert("Something went wrong!");
      setIsLoading(false);
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="container mx-auto my-5">
        <div className="flex justify-end mb-3">
          <button
            onClick={logout}
            className="rounded-sm px-2 py-1 w-20 bg-red-400 text-white hover:bg-red-500 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
        <ExpenseForm loadingUpdater={(value) => setIsLoading(value)} />
        <Filter filterUpdater={(filterValue) => setFilter(filterValue)} />
        <hr />
        <ExpensesList
          filteredExpenses={filteredExpenses}
          delFn={deleteExpense}
        />
        <hr />
        <TotalClearAll total={total} clearFn={deleteAll} />
        {isLoading && (
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

export default Home;
