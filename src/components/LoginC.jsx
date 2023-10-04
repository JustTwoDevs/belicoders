"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/logo.png";

export default function LoginC() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userInfo, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        router.push("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <main className="bg-black bg-opacity-25 backdrop-blur-sm text-white flex flex-col justify-items-center m-10 p-5 w-[400px]">
      <div className="flex justify-center">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>

      <h1 className="text-4xl font-bold text-center mb-5">Belicoders</h1>

      <form className="flex flex-col justify-center gap-1" onSubmit={onSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username or Email"
          className="bg-[#241f35] border-2 border-white rounded-lg p-2 m-2 text-white"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-[#241f35] border-2 border-white rounded-lg p-2 m-2 text-white"
        />
        <button className="bg-[#241f35] border-2 border-white rounded-lg p-2 m-2 text-white">
          Sign In
        </button>
        <div className="flex justify-between mb-10 ">
          <a href="#">Forgot Password?</a>
          <a href="#">Sign Up</a>
        </div>

        <p className="text-center text-sm mb-7">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>
      </form>
    </main>
  );
}
