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
    <nav
      style={{ zIndex: 1000 }}
      className="w-full top-0 left-0 bg-transparent"
    >
      <div className="md:flex items-center justify-between bg-cyan-200 py-2 md:px-10 px-4">
        <Link href="/#hero">
          <Image src={Name} alt="name" className="self-center" height={55} />
        </Link>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-3 top-5 cursor-pointer md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            {open ? (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <path
                d="M3 3h18v2H3V3zm0 6h18v2H3V9zm0 6h18v2H3v-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full 
          md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                href={link.link}
                className="text-gray-800 hover:text-gray-400 rounded-xl bg-red-500 p-2"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <Link
            className="font-bold ml-10 hover:transform hover:scale-110 duration-300"
            href="/login"
          >
            <Image src={user} alt="user" className="self-center" width={40} />
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
