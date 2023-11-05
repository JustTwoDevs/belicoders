"use client";
import dynamic from "next/dynamic";
import { ScrollPanel } from "primereact/scrollpanel";
import { useState, useEffect } from "react";
const ShowMD = dynamic(() => import("@/components/ShowMD"), {
  ssr: false,
});
async function getContest(name) {
  const url = `http://localhost:3000/api/v1/contests/${name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

export default function Rival({ params }) {
  const [contest, setContest] = useState({});
  const [loadingContest, setLoadingContest] = useState(true);

  useEffect(() => {
    async function fetchRival() {
      const foundContest = await getContest(params.title);
      setContest(foundContest);
      console.log(foundContest);
      setLoadingContest(false);
    }
    fetchRival();
  }, [params.title]);

  return (
    <main className="flex flex-col border border-solid border-gray-300 m-4 p-4 rounded-lg gap-4">
      <section className="p-2">
        <h1 className="text-black text-5xl">{contest?.title}</h1>
      </section>
      <ScrollPanel pt={{ barY: "bg-primary-200" }}>
        <section className="border border-solid border-gray-500 rounded-lg">
          <ShowMD markdown={contest?.description} />
        </section>
      </ScrollPanel>
      <section className="grid grid-cols-5">
        <section className="col-span-3"></section>
        <section className=""></section>
      </section>
    </main>
  );
}
