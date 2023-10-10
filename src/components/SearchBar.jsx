"use client";

import { useState } from "react";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");

  return (
    <form className="relative min-w-30">
      <div className="absolute inset-y-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
        >
          <path d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"></path>
        </svg>
      </div>
      <input
        id="search"
        type="text"
        value={search}
        className="w-full pl-10 py-2 input-primary"
        placeholder={props.placeholder}
        autoComplete="off"
        onChange={async (e) => {
          if (e.target.value != " ") {
            setSearch(e.target.value);
            props.handleChange(e.target.value);
          }
        }}
      />
    </form>
  );
}
