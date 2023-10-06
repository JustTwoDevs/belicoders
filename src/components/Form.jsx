"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Form(props) {
  const router = useRouter();

  return (
    <>
      <section className=" flex flex-col justify-center rounded-md  border-[1.5px]  p-8 lg:w-[28%] md:w-1/2 sm:w-3/4 min-h-[50%] gap-4 shadow-lg">
        <Image
          src={props.image}
          alt={props.alt}
          width={100}
          height={100}
          className="self-center"
        />

        <h1 className="text-xl font-bold text-center ">{props.title}</h1>
        <p className="text-center">{props.description}</p>

        <form
          className="flex flex-col justify-center gap-3"
          onSubmit={props.onSubmit}
        >
          {props.inputs.map((input, index) => {
            return (
              <input
                key={index}
                type={input.type}
                id={input.id}
                placeholder={input.placeholder}
                className="border-2 border-gray-400 rounded-lg p-2"
              />
            );
          })}
          <button className="bg-blue-400 text-white rounded-lg p-2 m-1 hover:bg-blue-500">
            {props.buttonText}
          </button>
          <div className="flex gap-4">
            <div className="border-[1px] border-gray-600 w-1/2 h-0 self-center" />
            Or
            <div className="border-[1px] border-gray-600 w-1/2 h-0 self-center" />
          </div>
          <Link
            className="text-center text-blue-600 font-extrabol"
            href={props.link1}
          >
            {props.linkText1}
          </Link>
        </form>
      </section>
      <section className="flex justify-center items-center rounded-md border-solid border-[1.5px] p-3 lg:w-[28%] md:w-1/2 sm:w-3/4 min-h-[6%] shadow-lg">
        <p>{props.text2}</p>
        <Link className="text-blue-500 font-bold ml-3" href={props.link2}>
          {props.linkText2}
        </Link>
      </section>
    </>
  );
}
