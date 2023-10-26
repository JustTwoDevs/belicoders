import dynamic from "next/dynamic";
import { Suspense } from "react";
import Discuss from "./Discuss";
import { Divider } from "primereact/divider";

const ReplieEditor = dynamic(() => import("./ReplieEditor"), {
  ssr: false,
});

const markdown = "Type comment here...(Markdown supported)";

export default function DiscussionsPanel({ discussions }) {
  return (
    <section className="pt-2 mr-2">
      <Suspense fallback={null}>
        <ReplieEditor markdown={markdown} />
      </Suspense>
      <section className="mt-5 flex flex-col gap-1 card">
        {discussions?.map((discussion, i) => (
          <>
            <Discuss discuss={discussion} key={i} />
            <Divider />
          </>
        ))}
      </section>
    </section>
  );
}
