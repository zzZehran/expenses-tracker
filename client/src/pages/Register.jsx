import React from "react";

export default function Register() {
  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-5">REGISTER</h1>
      <div className="flex justify-center m-5">
        <form className="space-x-2" action="">
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
