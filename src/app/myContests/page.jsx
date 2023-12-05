"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";
import useFetch from "@/hooks/useFetch";
import DropDownButtonSearch from "@/components/DropDownButtonSearch";

export default function Problems() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    kind: { value: null, matchMode: FilterMatchMode.EQUALS },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [tags, setTags] = useFetch(
    "api/v1/tags",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
    {
      errorMessage: "Error al obtener tags",
      callback: (tags) => {
        tags = tags.map((tag) => tag.name);
        setTags(tags);
      },
    },
  );
  const [filterTags, setFilterTags] = useState([]);
  const [contests, _setContests] = useFetch(
    `api/v1/myContests/?${new URLSearchParams({ tags: filterTags.join(",") })
      .toString()
      .replace(/%2C/g, ",")}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
    {
      errorMessage: "Error al obtener contests",
    },
    [filterTags],
  );
  const [isOpenK, setIsOpenK] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);

  const handleTag = (tag) => {
    let newFilters = [...filterTags];
    newFilters.push(tag);
    setFilterTags(newFilters);
  };

  const handleDeleteTag = (tag) => {
    const newTags = filterTags.filter((t) => t !== tag);
    if (newTags.length == 0) setFilterTags([]);
    else setFilterTags(newTags);
  };

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
        <section className="flex gap-5 justify-center min-h-11 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto mt-5">
          <Link href="/createContest">
            <Button
              className="bg-primary-200 px-3 h-12"
              label="Create Contest"
            />
          </Link>
          <SearchBar
            handleChange={handleSearch}
            placeholder="Search Contests"
          />
          <DropDownButtonSearch
            id="tags"
            filters={filterTags}
            tags={tags}
            handleAdd={handleTag}
            handleRemove={handleDeleteTag}
            handleReset={() => {
              setFilterTags([]);
            }}
            isOpen={isOpenT}
            open={() => {
              setIsOpenT(true);
              setIsOpenK(false);
            }}
            close={() => setIsOpenT(false)}
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
          {filterTags.map((tag, i) => (
            <Tag key={i} name={tag} deleteFilter={handleDeleteTag} />
          ))}
        </section>
        <section className="mx-auto w-3/4">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
