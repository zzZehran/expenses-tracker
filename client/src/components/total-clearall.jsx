import React from "react";

export default function TotalClearAll({ total, clearFn }) {
  return (
    <div className="flex justify-between mt-3">
      <span className="font-bold text-2xl"> Total: ${total}</span>
      <button
        className="rounded-sm px-2 w-30 bg-red-400 text-white hover:bg-red-500 hover:cursor-pointer"
        onClick={clearFn}
      >
        Clear all
      </button>
    </div>
  );
}
