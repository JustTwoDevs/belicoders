import StepCard from "./StepCard";

export default function Steps() {
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 w-3/4 mx-auto ">
      <StepCard
        title="Step 1"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus?"
      />
      <StepCard
        title="Step 2"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus?"
      />
      <StepCard
        title="Step 3"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus?"
      />
    </section>
  );
}
