import React from "react";
import Image from "next/image";
import Logo from "../assets/LogoColor.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div id="hero" className="flex gap-6 bg-transparent py-14">
      <section className="flex flex-col justify-center items-center m-10 md:w-1/2 md:ml-20 md:items-baseline lg:w-1/2 lg:ml-24 xl:w-1/2  xl:ml-40 gap-8">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-black font-semibold ">
          CodeBeaters is the best plattform to improve your programming skills
        </p>
        <h2 className="sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#383c40] ">
          Our goal is to complement the education and professional growth of
          aspiring software developers or professions related to the areas of
          computer science, serving as a tool for institutions dedicated to
          education in the field of computer science.
        </h2>
        <div className="flex flex-col gap-2">
          <Link
            href={"/register"}
            className="bg-primary-300 text-white  px-4 py-2 rounded-xl text-2xl w-72 text-center"
          >
            GET STARTED
          </Link>
          <div className="flex gap-4 text-[#383c40]">
            <div className="border-[1px] border-[#383c40] w-[118px]  h-0 self-center" />
            OR
            <div className="border-[1px] border-[#383c40] w-[118px] h-0 self-center" />
          </div>
          <Link
            href={"/login"}
            className="bg-primary-300 text-white  px-4 py-2 rounded-xl text-2xl w-72 text-center"
          >
            LOGIN
          </Link>
        </div>
      </section>
      <Image
        src={Logo}
        alt="name"
        className="self-center hidden md:flex md:w-72 lg:flex lg:w-80 xl:flex xl:w-auto"
        quality={100}
      />
    </div>
  );
};

export default Hero;
