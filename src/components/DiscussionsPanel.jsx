import dynamic from "next/dynamic";
import { Suspense } from "react";
import Discuss from "./Discuss";
import { useRouter } from "next/navigation";

const ReplieEditor = dynamic(() => import("./ReplieEditor"), {
  ssr: false,
});

const markdown = "Type comment here...(Markdown supported)";

export default function DiscussionsPanel({ discussions, name }) {
  const router = useRouter();
  async function discussFetch(markdown) {
    const url = `http://localhost:3000/api/v1/rivals/${name}/discuss`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: markdown }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) router.refresh();
      else console.log(data.message);
    } catch (error) {
      console.log(`Error al obtener problema: ${error.message}`);
    }
  }

  return (
    <section className="pt-2 mr-2">
      <Suspense fallback={null}>
        <ReplieEditor markdown={markdown} comment={discussFetch} />
      </Suspense>
      <section className="mt-5 flex flex-col gap-1 card">
        {discussions?.map((discussion, i) => (
          <>
            <Discuss discuss={discussion} key={i} />
          </>
        ))}
      </section>
    </section>
  );
}
