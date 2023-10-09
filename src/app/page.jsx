import React from "react";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import About from "@/components/About";
import Navbar from "@/components/Navbar";
import DevTeam from "@/components/DevTeam";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#241f35] text-white flex flex-col justify-center w-full ">
      <Navbar />
      <Hero />
      <Steps />
      <About />
      <DevTeam />
      <Footer />
    </main>
  );
}
