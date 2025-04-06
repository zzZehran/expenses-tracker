import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login({ loginUpdater, setUser }) {
  const navigate = useNavigate();
  function login(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn) {
          loginUpdater(true);
          // setUser(data.user);
          navigate("/");
        } else {
          alert("Couldn't login");
        }
      });
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-5">LOGIN</h1>
      <div className="flex flex-col items-center m-5">
        <form className="space-x-2" action={login}>
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
            Login
          </button>
        </form>
        <div className="mt-3">
          <p className="text-slate-500 text-sm">
            Not Registered?
            <span className="ms-1 text-blue-400 hover:cursor-pointer hover:text-blue-600">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
