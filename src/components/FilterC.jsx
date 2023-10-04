"use client";

export default function FilterC(props) {
  return (
    <div className="-mx-1 flex flex-wrap">
      <span className="m-1 inline-flex items-center whitespace-nowrap rounded px-2 py-[3px] text-xs leading-normal">
        <span className="mr-1">{props.name}</span>
        <span
          className="cursor-pointer transition-all"
          onClick={() => {
            props.deleteFilter(props.name);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-3.5 w-3.5"
          >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1.414-10l2.293-2.293a1 1 0 00-1.414-1.414L12 10.586 9.707 8.293a1 1 0 00-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 001.414-1.414L13.414 12z"></path>
          </svg>
        </span>
      </span>
    </div>
  );
}
