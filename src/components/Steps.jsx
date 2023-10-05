import StepCard from "./StepCard";

export default function Steps() {
  return (
    <section className="flex justify-center m-5">
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
