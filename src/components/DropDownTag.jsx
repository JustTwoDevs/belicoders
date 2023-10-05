import SearchBar from "./SearchBar";
import { useState } from "react";
export default function DropDownTag(props) {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-slate-400 transform absolute w-max max-w-xs mt-1 p-2.5 rounded-lg focus:outline-none opacity-100">
      <SearchBar
        placeholder="Search for a tag"
        handleChange={(value) => setSearch(value)}
      />
      <section className="mt-4">
        <div className="block">
          <div className="-m-1 mt-1 flex max-h-[400px] flex-wrap overflow-auto py-4">
            {props.tags
              .filter((tag) => {
                return search.toLowerCase() === ""
                  ? tag
                  : tag.toLowerCase().includes(search);
              })
              .map((tag, i) =>
                props.filters.includes(tag) ? (
                  <span
                    className={
                      "px-2 text-xs leading-6 rounded-full cursor-pointer transition-all m-1 hover:bg-blue-700 bg-blue-500 text-white "
                    }
                    key={i}
                    onClick={() => {
                      props.handleRemove(tag);
                    }}
                  >
                    {tag}
                  </span>
                ) : (
                  <span
                    className={
                      "px-2 text-xs leading-6 rounded-full cursor-pointer transition-all m-1 hover:bg-slate-600 bg-slate-500"
                    }
                    key={i}
                    onClick={() => {
                      props.handleAdd(tag);
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
          </div>
        </div>
      </section>
      <hr />
      <section className="mt-2.5 flex flex-row-reverse px-2 py-0.5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => props.handleReset()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className="transform transition-all duration-500 hover:-rotate-[360deg]"
          >
            <path d="M5.725 9.255h2.843a1 1 0 110 2H3.2a1 1 0 01-1-1V4.887a1 1 0 012 0v3.056l2.445-2.297a9.053 9.053 0 11-2.142 9.415 1 1 0 011.886-.665 7.053 7.053 0 1010.064-8.515 7.063 7.063 0 00-8.417 1.202L5.725 9.255z"></path>
          </svg>
          <span>Reset</span>
        </div>
      </section>
    </div>
  );
}
