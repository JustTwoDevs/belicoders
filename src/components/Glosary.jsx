"use client";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useState } from "react";

export default function Glosary() {
  const [tabs] = useState([
    {
      header: "What is a rival?",
      children: (
        <p className="m-0">
          A problem of either an algorithmic or SQL type. It is your rival to
          beat.
        </p>
      ),
    },
    {
      header: "What is a contest?",
      children: (
        <p className="m-0">
          A collection of rivals or problems of any kind. It will be a Sparring
          session.
        </p>
      ),
    },
    {
      header: "What is a RSC?",
      children: (
        <p className="m-0">
          Is when the Referee stops the contest. When your rival wins by
          RunTime.
        </p>
      ),
    },
    {
      header: "Are there assaults?",
      children: (
        <p className="m-0">
          Yes!! Each of the rounds in the ring, those test cases that will
          measure your blows (Code).
        </p>
      ),
    },
  ]);

  return (
    <section className="bg-white py-10 flex flex-col gap-6 items-center">
      <h2 className="text-center text-3xl">
        Do you have questions? We have the answers.
      </h2>
      <Accordion className="items-center w-4/6">
        {tabs.map((tab, i) => {
          return (
            <AccordionTab
              key={i}
              header={tab.header}
              headerClassName="text-primary-400 font-bold"
              className="w-full border-b-2"
              pt={{
                headerAction: "flex flex-row-reverse bg-primary-400",
              }}
            >
              {tab.children}
            </AccordionTab>
          );
        })}
      </Accordion>
    </section>
  );
}
