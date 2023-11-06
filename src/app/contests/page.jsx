"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import Tag from "@/components/Tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import Link from "next/link";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

async function getContests() {
  const url = "http://localhost:3000/api/v1/contests";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else alert(data.message);
  } catch (error) {
    console.log(`Error al obtener problemas: ${error.message}`);
  }
}

export default function Problems() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [contests, setContests] = useState([]);
  const [isOpenD, setIsOpenD] = useState(false);

  useEffect(() => {
    async function fetchContests() {
      const foundContests = await getContests();
      setContests(foundContests);
    }
    fetchContests();
  }, []);

  const handleSearch = (value) => {
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const tittleBodyTemplate = (contest) => {
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={`/contests/${contest.title.replace(/ /g, "-")}`}
      >
        {contest.title}
      </Link>
    );
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-2 min-w-full">
        <section className="flex flex-wrap gap-5 justify-center min-h-11 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto mt-5">
          <SearchBar
            handleChange={handleSearch}
            placeholder="Search Contests"
          />
          <div className="flex gap-5 justify-center">
            <DropdownButton
              id="difficulty"
              name="Difficulty"
              list={["Easy", "Medium", "Hard"]}
              isOpen={isOpenD}
              open={() => {
                setIsOpenD(true);
              }}
              close={() => setIsOpenD(false)}
            />
          </div>
        </section>
        <section className="flex flex-wrap gap-3 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto"></section>
        <DataTable
          removableSort
          value={contests}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          globalFilterFields={["title", "createdBy.name"]}
          emptyMessage="No contests found"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="title"
            header="Tittle"
            sortable
            body={tittleBodyTemplate}
          ></Column>
          <Column field="kind" header="Kind" sortable></Column>
          <Column field="createdBy.name" header="User" sortable></Column>
        </DataTable>
      </main>
      <Footer />
    </>
  );
}
