"use client";

import Image from "next/image";
import Link from "next/link";

export default function Form(props) {
  return (
    <>
      <section className=" flex flex-col justify-center rounded-md border-[1.5px] p-8 lg:w-[28%] md:w-1/2 sm:w-3/4 min-h-[50%] gap-4 shadow-lg">
        <Image
          src={props.image}
          alt={props.alt}
          width={100}
          height={100}
          className="self-center"
        />
        {props.title ? (
          <h1 className="text-xl font-bold text-center ">{props.title}</h1>
        ) : null}
        {props.description ? (
          <p className="text-center">{props.description}</p>
        ) : null}

        <form
          className="flex flex-col justify-center gap-3"
          onSubmit={props.onSubmit}
        >
          {props.inputs.map((input, index) => {
            return (
              <input
                key={index}
                type={input.type}
                name={input.name}
                required={input.required}
                placeholder={input.placeholder}
                className="input-primary"
              />
            );
          })}
          <button className="btn-primary">{props.buttonText}</button>
          <div className="flex gap-4">
            <div className="border-[1px] border-gray-300 w-1/2 h-0 self-center" />
            Or
            <div className="border-[1px] border-gray-300 w-1/2 h-0 self-center" />
          </div>
          <Link
            className="text-center text-[#3e92f2] font-bold text-sm"
            href={props.link1}
          >
            {props.linkText1}
          </Link>
        </form>
      </section>
      <section className="flex justify-center items-center rounded-md border-solid border-[1.5px] p-3 lg:w-[28%] md:w-1/2 sm:w-3/4 min-h-[6%] shadow-lg">
        <p>{props.text2}</p>
        <Link className="text-[#3e92f2] font-bold ml-3" href={props.link2}>
          {props.linkText2}
        </Link>
      </section>
    </>
  );
}
