"use client";
import React, { useState } from "react";
import user from "../assets/user.png";
import Image from "next/image";
import Name from "../assets/Name.png";
import Link from "next/link";

const Nav = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Problems", link: "/problems" },
    { name: "Contact", link: "/" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div
      style={{ zIndex: 1000 }}
      className="shadow-md w-full sticky top-0 left-0"
    >
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <Image src={Name} alt="name" className="self-center" width={250} />

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
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
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full 
          md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                href={link.link}
                className="text-gray-800 hover:text-gray-400"
              >
                {link.name}
              </Link>
            </li>
          ))}

          <Link className="font-bold ml-10" href="/login">
            <Image src={user} alt="user" className="self-center" width={40} />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
