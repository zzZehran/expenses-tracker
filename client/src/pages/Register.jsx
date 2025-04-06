import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  function register(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    fetch("http://localhost:3000/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      });
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-5">REGISTER</h1>
      <div className="flex justify-center m-5">
        <form className="space-x-2" action={register}>
          <label className="text-lg px-1" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="bg-zinc-100 rounded-sm mt-1 mb-3 px-2 py-1 w-60"
            id="username"
            type="text"
            name="username"
          />
          <br />
          <label className="text-lg px-1" htmlFor="username">
            Password
          </label>
          <br />
          <input
            className="bg-zinc-100 rounded-sm mt-1 px-2 py-1 w-60"
            id="password"
            type="password"
            name="password"
          />
          <br />
          <button className="rounded-sm px-2 py-1 w-60 mt-4 bg-blue-400 text-white hover:bg-blue-500 hover:cursor-pointer">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
