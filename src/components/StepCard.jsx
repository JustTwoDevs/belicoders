import Image from "next/image";

export default function StepCard(props) {
  return (
    <article
      style={{ zIndex: 1 }}
      className="hover:transform hover:scale-105 duration-300 p-5 m-2 flex flex-col items-center gap-2"
    >
      <Image
        src={props.image}
        alt="name"
        className="self-center"
        quality={100}
        width={200}
        height={300}
      />
      <h5 className="mb-2 font-sans text-2xl text-white font-semibold text-center">
        {props.title}
      </h5>
      <p className="text-lg  font-light text-[#969696] ">{props.description}</p>
    </article>
  );
}
