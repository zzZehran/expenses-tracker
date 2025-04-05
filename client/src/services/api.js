const url = "http://localhost:3000/api";

export const fetchExpenses = async () => {
  const response = await fetch(`${url}/expenses`, {
    method: "GET",
  });
  const data = await response.json();
  return data.allExpenses;
};

export const fetchDelExpense = async (id) => {
  const response = await fetch(`${url}/expenses`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  return response;
};

export const fetchDelAll = async () => {
  const response = await fetch(`${url}/expenses/all`, {
    method: "DELETE",
  });
  return response;
};
