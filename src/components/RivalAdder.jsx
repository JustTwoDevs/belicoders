"use client";
import { useState } from "react";
import DropdownButton from "./DropdownButton";
import RivalsTable from "./RivalsTable";
import useFetch from "@/hooks/useFetch";

export default function RivalAdder({ state, className }) {
  const [rivals, setRivals] = useFetch(
    "api/v1/rivals",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    {
      errorMessage: "Error al obtener rivals",
      callback: (rivals) => {
        setLoading(false);
        setRivals(rivals);
      },
    },
  );

  const [isOpen, setIsOpen] = useState(false);
  const [addedRivals, setAddedRivals] = state;
  const [loading, setLoading] = useState(true);

  const handleAddRival = (value) => {
    setAddedRivals([...addedRivals, rivals.find((r) => r.title === value)]);
  };

  return (
    <section className={className}>
      {!loading ? (
        <DropdownButton
          id="rivals"
          name="Rivals"
          list={rivals.map((rival) => {
            return rival.title;
          })}
          handleChange={handleAddRival}
          isOpen={isOpen}
          open={() => {
            setIsOpen(true);
          }}
          close={() => {
            setIsOpen(false);
          }}
        />
      ) : (
        <div>Loading rivals...</div>
      )}
      <RivalsTable
        state={[addedRivals, setAddedRivals]}
        columns={["createdBy", "remove"]}
        own={false}
      />
    </section>
  );
}
