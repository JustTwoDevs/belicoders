import React from "react";
import Image from "next/image";
import Logo from "../assets/LogoColor.png";

const Hero = () => {
  return (
    <div id="hero" className="flex gap-6 bg-cyan-200 py-14">
      <section className="flex flex-col justify-center w-1/2 ml-40 gap-8">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold">
          The plattform to improve your programming skills
        </p>
        <h2 className="sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Our goal is to complement the education and professional growth of
          aspiring software developers or professions related to the areas of
          computer science, serving as a tool for institutions dedicated to
          education in the field of computer science.
        </h2>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-xl text-2xl w-72">
            GET STARTED
          </button>
          <div className="flex gap-4">
            <div className="border-[1px] border-black w-[120px]  h-0 self-center" />
            Or
            <div className="border-[1px] border-black w-[120px] h-0 self-center" />
          </div>
          <button className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-xl text-2xl w-72">
            LOGIN
          </button>
        </div>
      </section>
      <section>
        <Image
          src={Logo}
          alt="name"
          className="self-center object-cover"
          quality={100}
        />
      </section>
    </div>
  );
};

export default Hero;
