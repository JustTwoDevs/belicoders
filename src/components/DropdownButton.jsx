"use client";
import DropDown from "./DropDown";
import { useState } from "react";

export default function DropdownButton(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <section className="relative flex-initial bg-white w-28">
      <button
        className="rounded px-3 py-1.5 text-left cursor-pointer focus:outline-none whitespace-nowrap flex items-center justify-between"
        id={props.id}
        type="button"
        onClick={toggle}
      >
        {props.name}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          className={
            "ml-3 pointer-events-none transition duration-300" +
            (isOpen ? " rotate-180 transform" : "")
          }
        >
          <path d="M4.929 7.913l7.078 7.057 7.064-7.057a1 1 0 111.414 1.414l-7.77 7.764a1 1 0 01-1.415 0L3.515 9.328a1 1 0 011.414-1.414z"></path>
        </svg>
      </button>
      {isOpen && (
        <DropDown
          list={props.list}
          handleChange={props.handleChange}
          close={toggle}
        />
      )}
    </section>
  );
}
