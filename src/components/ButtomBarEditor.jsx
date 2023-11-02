export default function ButtomBarEditor(props) {
  return (
    <div className="mt-2 py-[7.5px] rounded-md flex bg-white shrink-0">
      <button
        className="font-medium items-center ml-4 text-sm flex"
        onClick={() => props.setOpenConsole(!props.openConsole)}
      >
        Console
        <div className="ml-1 transform transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
            height="1em"
            fill="currentColor"
            className={
              "ml-3 pointer-events-none transition duration-300" +
              (props.openConsole ? " rotate-180 transform" : "")
            }
          >
            <path d="M16.293 14.707a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 101.414 1.414L12 10.414l4.293 4.293z"></path>
          </svg>
        </div>
      </button>
      <div className="ml-auto flex items-center gap-4 mr-2">
        <button className="py-1 font-medium items-center select-none rounded px-4 text-sm bg-slate-400">
          Run
        </button>
        <button className="py-1 font-medium items-center select-none rounded px-4 text-sm bg-green-500 text-white">
          Submit
        </button>
      </div>
    </div>
  );
}
