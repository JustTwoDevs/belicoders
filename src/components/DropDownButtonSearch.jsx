"use client";

import DropDownSearch from "./DropDownSearch";

export default function DropDownButtonSearch(props) {
  const toggle = () => {
    props.isOpen ? props.close() : props.open();
  };
  return (
    <section className={`${props.className} bg-white min-w-20`}>
      <button className="drop-btn" id={props.id} type="button" onClick={toggle}>
        Tags
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          fill="currentColor"
          className={
            "ml-3 pointer-events-none transition duration-300 " +
            (props.isOpen ? " rotate-180 transform" : "")
          }
        >
          <path d="M4.929 7.913l7.078 7.057 7.064-7.057a1 1 0 111.414 1.414l-7.77 7.764a1 1 0 01-1.415 0L3.515 9.328a1 1 0 011.414-1.414z"></path>
        </svg>
      </button>
      {props.isOpen && (
        <DropDownSearch
          tags={props.tags}
          filters={props.filters}
          handleAdd={props.handleAdd}
          handleRemove={props.handleRemove}
          handleReset={props.handleReset}
        />
      )}
    </section>
  );
}
