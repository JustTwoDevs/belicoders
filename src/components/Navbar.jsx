"use client";
import React, { useState } from "react";
import user from "../assets/user.png";
import Image from "next/image";
import Name from "../assets/Name.png";
import Link from "next/link";

const Nav = () => {
  let Links = [
    { name: "Rivals", link: "/rivals" },
    { name: "Contests", link: "/contests" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <nav style={{ zIndex: 1000 }} className="w-full top-0 left-0 bg-white">
      <div className="md:flex items-center justify-between bg-transparent py-2 md:px-10 px-4">
        <Link href="/">
          <Image src={Name} alt="name" className="self-center" height={55} />
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-3 top-5 cursor-pointer invert hover:invert-0 md:hidden rounded-md hover:bg-white transition-all duration-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              d="M3 3h18v2H3V3zm0 6h18v2H3V9zm0 6h18v2H3v-2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <ul
          className={`shadow-lg md:shadow-none md:flex md:items-center md:pb-0 pb-4 h-full absolute bg-[#383c40] md:bg-transparent md:static md:z-auto z-[-1] left-0 w-full 
          md:w-auto md:pl-0 pl-4 transition-all duration-500 ease-in ${
            open ? "right-20 " : "left-[700px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 mb-5">
              <Link
                href={link.link}
                className="text-black text-xl font-light py-2 px-5 rounded-full hover:bg-[#383c40] hover:text-white transition-all duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <Link
            className="font-bold md:ml-10 hover:bg-[#383c40] rounded-full"
            href="/login"
          >
            <Image
              src={user}
              alt="user"
              className="self-center hover:text-white hover:invert transition-all duration-500"
              width={40}
            />
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
