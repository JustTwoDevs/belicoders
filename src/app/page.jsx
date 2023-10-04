import Steps from "@/components/Steps";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="bg-[#241f35] text-white flex flex-col justify-center">
      <Steps />
      <About />
    </main>
  );
}
