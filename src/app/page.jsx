import React from "react";
import Navigation from "./register/page";

import Steps from "@/components/Steps";
import About from "@/components/About";
import Navbar from '@/components/Navbar';
import { BrowserRouter } from 'react-router-dom'

export default function Home() {
  return (
 
    <main className="bg-[#241f35] text-white flex flex-col justify-center w-full h-screen">
      <Navbar/>
      <Steps />
      <About />
    </main>
 
  );
}
