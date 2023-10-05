export default function StepCard(props) {
  return (
    <article className="bg-[#8b84c8] w-3/12 rounded-2xl hover:transform hover:scale-105 duration-300 p-5 m-2">
      <h5 className="mb-2 font-sans text-xl font-semibold">{props.title}</h5>
      <p className="font-sans font-light">{props.description}</p>
      <div className="pt-4 w-[133px]">
        <a
          href="#"
          className="flex items-center rounded-lg py-2 px-4 font-sans text-xs font-bold hover:bg-blue-500/25 active:bg-blue-500/50"
        >
          LEARN MORE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={2}
            className="h-4 w-4 ml-2"
            stroke="currentColor"
          >
            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}
