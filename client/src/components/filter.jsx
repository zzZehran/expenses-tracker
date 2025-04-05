import { useState } from "react";

export default function Filter({ filterUpdater }) {
  function handleFilter(event) {
    const filterValue = event.target.value;
    filterUpdater(filterValue);
  }
  return (
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
  );
}
