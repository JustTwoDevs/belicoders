export default function DropDown(props) {
  return (
    <div className="bg-slate-200 shadow-md max-w-[15rem] min-w-[5rem] absolute my-1 rounded-lg focus:outline-none">
      {props.list.map((item, i) => (
        <section className="cursor-pointer py-1.5" key={i} role="menuitem">
          <div
            key={i}
            className="px-4 text-sm text-black cursor-pointer hover:font-semibold"
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
