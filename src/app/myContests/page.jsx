"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import Link from "next/link";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";

async function getMyContests() {
  const url = "http://localhost:3000/api/v1/myContests";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
    kind: { value: null, matchMode: FilterMatchMode.EQUALS },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [contests, setContests] = useState([]);
  const [isOpenK, setIsOpenK] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);

  useEffect(() => {
    async function fetchContests() {
      const foundContests = await getMyContests();
      setContests(foundContests);
    }
    fetchContests();
  }, []);

  const handleSearch = (value) => {
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const handleKind = (value) => {
    let _filters = { ...filters };
    _filters["kind"].value = value;
    setFilters(_filters);
  };

  const handleState = (value) => {
    let _filters = { ...filters };
    _filters["state"].value = value;
    setFilters(_filters);
  };

  const handleDeleteKind = () => {
    let _filters = { ...filters };
    _filters["kind"].value = null;
    setFilters(_filters);
  };

  const handleDeleteState = () => {
    let _filters = { ...filters };
    _filters["state"].value = null;
    setFilters(_filters);
  };

  const tittleBodyTemplate = (contest) => {
    const url =
      contest.state === "Draft"
        ? `/myContests/${contest._id}`
        : `/contests/${contest.title.replace(/\s/g, "-")}`;
    return (
      <Link className="font-medium hover:text-primary-400" href={url}>
        {contest.title}
      </Link>
    );
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-2 min-w-full">
        <section className="flex flex-wrap gap-5 justify-center min-h-11 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto mt-5">
          <Link href="/createContest">
            <Button className="p-3 bg-primary-300" label="Create" />
          </Link>
          <SearchBar
            handleChange={handleSearch}
            placeholder="Search Contests"
          />
          <DropdownButton
            id="kind"
            name="kind"
            list={["Algorithm", "SQL", "Miscellaneous"]}
            isOpen={isOpenK}
            handleChange={handleKind}
            open={() => {
              setIsOpenK(true);
              setIsOpenS(false);
            }}
            close={() => setIsOpenK(false)}
          />
          <DropdownButton
            id="state"
            name="state"
            list={["Draft", "Published"]}
            handleChange={handleState}
            isOpen={isOpenS}
            open={() => {
              setIsOpenS(true);
              setIsOpenK(false);
            }}
            close={() => setIsOpenS(false)}
          />
        </section>
        <section className="flex flex-wrap gap-3 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto">
          {filters["kind"].value && (
            <Tag name={filters["kind"].value} deleteFilter={handleDeleteKind} />
          )}
          {filters["state"].value && (
            <Tag
              name={filters["state"].value}
              deleteFilter={handleDeleteState}
            />
          )}
        </section>

        <section className="flex flex-wrap gap-3 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto"></section>
        <DataTable
          removableSort
          value={contests}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          filters={filters}
          globalFilterFields={["title", "kind", "state"]}
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
          <Column field="state" header="State" sortable></Column>
        </DataTable>
      </main>
      <Footer />
    </>
  );
}
