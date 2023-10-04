export default function DropDown(props) {
  return (
    <div className="bg-slate-400 max-w-[15rem] min-w-[5rem] absolute my-1 rounded-lg overflow-auto focus:outline-none transition ease-in duration-75 transform scale-95">
      {props.list.map((item, i) => (
        <section className="cursor-pointer h-8 py-1.5" key={i} role="menuitem">
          <div
            key={i}
            className="w-full px-4 py-2 text-sm text-black cursor-pointer hover:font-semibold"
            value={i}
            onClick={(e) => {
              props.handleChange(item);
              props.close();
            }}
          >
            {item}
          </div>
        </section>
      ))}
    </div>
  );
}
