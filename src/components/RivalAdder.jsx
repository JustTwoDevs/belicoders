
"use client";
import { useState, useEffect } from "react";
import DropdownButton from "./DropdownButton";
import RivalsTable from "./RivalsTable";

async function getRivals() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/rivals`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export default function RivalAdder({ state, className }) {
  const [rivals, setRivals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addedRivals, setAddedRivals] = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRivals() {
      const fetchedRivals = await getRivals();
      setRivals(fetchedRivals);
    }
    fetchRivals();
    setLoading(false);
  }, []);

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
      <RivalsTable value={[addedRivals, setAddedRivals]} />
    </section>
  );
}
