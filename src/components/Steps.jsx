import StepCard from "./StepCard";
import Discusion from "./../assets/discusion.png";
import Create from "./../assets/create.png";
import Ring from "./../assets/ring.png";

export default function Steps() {
  return (
    <section className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 w-3/4 mx-auto">
      <StepCard
        title="Create & Publish"
        description="Design and publish your own programming exercises on our platform. Whether they are algorithmic or SQL."
        image={Create}
      />
      <StepCard
        title="Resolve Rivals & Contests"
        description="Solve other users' programming exercises and compete with them to see who is the best. You can even compete in contests."
        image={Ring}
      />
      <StepCard
        title="Interact"
        description="Comment and rate other users' exercises. You can see their posts on their profiles."
        image={Discusion}
      />
    </section>
  );
}
