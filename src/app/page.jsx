import React from "react";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import About from "@/components/About";
import DevTeam from "@/components/DevTeam";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-full ">
      <Hero />
      <Steps />
      <About />
      <DevTeam />
      <Footer />
    </main>
  );
}
