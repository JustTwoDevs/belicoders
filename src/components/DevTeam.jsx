import DevTeamCard from "./DevTeamCard";

export default function DevTeam() {
  return (
    <section className="flex flex-col items-center w-full gap-8 p-10">
      <h1 className="text-center text-white text-3xl xl:text-5xl">Dev Team</h1>
      <section className="grid grid-cols-1 gap-10 xl:grid-cols-3 xl:gap-16">
        <DevTeamCard name="Carlos" imgsrc="random" />
        <DevTeamCard name="Valentina" imgsrc="random" />
        <DevTeamCard name="Tomas" imgsrc="random" />
      </section>
    </section>
  );
}
