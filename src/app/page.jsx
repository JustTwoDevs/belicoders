import React from "react";
import Hero from "@/components/Hero";
import Steps from "@/components/Steps";
import Glosary from "@/components/Glosary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col justify-center w-full ">
      <Hero />
      <Steps />
      <Glosary />
      <Footer />
    </main>
  );
}
