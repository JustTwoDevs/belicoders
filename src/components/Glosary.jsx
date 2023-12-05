import Card from "./Card";
import Logo from "../assets/LogoColor.png";

export default function Glosary() {
  return (
    <section className="flex flex-col items-center w-full gap-8 p-10 ">
      <section className="grid grid-cols-1 gap-10 xl:grid-cols-2 xl:gap-16">
        <Card
          name="Rival"
          description="A problem of either an algorithmic or SQL type. It's your rival to beat."
          img={Logo}
          color="bg-primary-200"
        />
        <Card
          name="Contest"
          description="A collection of rivals or problems of any kind. It will be a Sparring session."
          img={Logo}
          color="bg-primary-400"
        />
        <Card
          name="RSC"
          description="Referee stops the contest. When your rival wins by RunTime."
          img={Logo}
          color="bg-red-400"
        />
        <Card
          name="Assaults"
          description="Each of the rounds in the ring, those test cases that will measure your blows (Code)."
          img={Logo}
          color="bg-blue-400"
        />
      </section>
    </section>
  );
}
