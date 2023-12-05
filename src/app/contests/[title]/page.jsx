"use client";
import useFetch from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ScrollPanel } from "primereact/scrollpanel";
import { useState, useRef } from "react";

const ShowMD = dynamic(() => import("@/components/ShowMD"), {
  ssr: false,
});

export default function Contest({ params }) {
  const [contest, _setContest] = useFetch(
    `api/v1/contests/${params.title}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    {
      errorMessage: "Error al obtener el contest",
    },
  );
  const [selectedRival, setSelectedRival] = useState({});
  const mdRef = useRef(null);

  const difficultyBodyTemplate = (rival) => {
    let color;
    if (rival.difficulty === "Easy") color = "text-[#00b8a3]";
    else if (rival.difficulty === "Medium") color = "text-[#FFBE1C]";
    else color = "text-[#ef4444]";
    return <h1 className={`${color} font - bold`}>{rival.difficulty}</h1>;
  };

  const tittleBodyTemplate = (rival) => {
    return (
      <button
        className="font-medium hover:text-primary-400"
        onClick={() => {
          console.log(rival);
          mdRef.current?.setMarkdown("hola");
          setSelectedRival(rival);
        }}
      >
        {rival.title}
      </button>
    );
  };

  const goToBodyTemplate = (rival) => {
    return (
      <>
        {contest.rivals && (
          <Link
            href={`/contests/${contest.title}/${contest.rivals.indexOf(rival)}`}
          >
            Go To rival
          </Link>
        )}
      </>
    );
  };

  return (
    contest && (
      <main className="flex flex-col border border-solid border-gray-300 m-4 p-4 rounded-lg gap-4 min-h-[90vh] lg:h-[90vh]">
        <section className="p-2">
          <h1 className="text-black font-bold text-5xl">{contest?.title}</h1>
        </section>
        <ScrollPanel className="h-[45%]" pt={{ barY: "bg-primary-200" }}>
          <section className="h-full border border-solid border-gray-300 rounded-lg">
            {contest.description && <ShowMD markdown={contest?.description} />}
          </section>
        </ScrollPanel>
        <section className="lg:flex h-[45%] lg:gap-5 border border-solid border-gray-300 rounded-lg">
          <section className="p-2 lg:border-r boder-solid border-gray-300 lg:col-span-2 rounded-lg">
            <DataTable
              removableSort
              value={contest?.rivals}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[10, 25, 50]}
              emptyMessage="No contests found"
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="title"
                header="Tittle"
                sortable
                body={tittleBodyTemplate}
              ></Column>
              <Column
                field="difficulty"
                header="Difficulty"
                body={difficultyBodyTemplate}
                sortable
              ></Column>
              <Column field="avgGrade" header="Grade" sortable></Column>
              <Column header="GoTo" body={goToBodyTemplate}></Column>
            </DataTable>
          </section>
          <ScrollPanel
            className="p-4 lg:block w-[55%] lg:col-span-3 border-l boder-solid border-gray-300 rounded-lg"
            pt={{ barY: "bg-primary-200" }}
          >
            {selectedRival.statement && (
              <ShowMD markdown={selectedRival.statement} ref={mdRef} />
            )}
          </ScrollPanel>
        </section>
      </main>
    )
  );
}
