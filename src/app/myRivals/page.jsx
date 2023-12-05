"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import DropdownButtonSearch from "@/components/DropDownButtonSearch";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";
import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useState } from "react";
import useFetch from "@/hooks/useFetch";

export default function Problems() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    difficulty: { value: null, matchMode: FilterMatchMode.EQUALS },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [filterTags, setFilterTags] = useState([]);
  const [isOpenD, setIsOpenD] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  const [_dialogVisible, _setDialogVisible] = useState(false);

  const [rivals, _setRivals] = useFetch(
    `api/v1/myRivals/?${new URLSearchParams({ tags: filterTags.join(",") })
      .toString()
      .replace(/%2C/g, ",")}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
    {
      errorMessage: "Error al obtener rivales",
    },
    [filterTags],
  );

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

  const handleSearch = (value) => {
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
  };

  const handleDifficulty = (value) => {
    let _filters = { ...filters };
    _filters["difficulty"].value = value;
    setFilters(_filters);
  };

  const handleDeleteDifficulty = () => {
    let _filters = { ...filters };
    _filters["difficulty"].value = null;
    setFilters(_filters);
  };
  const handleState = (value) => {
    let _filters = { ...filters };
    _filters["state"].value = value;
    setFilters(_filters);
  };

  const handleDeleteState = () => {
    let _filters = { ...filters };
    _filters["state"].value = null;
    setFilters(_filters);
  };

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

  const difficultyBodyTemplate = (rival) => {
    let color;
    if (rival.difficulty === "Easy") color = "text-[#00b8a3]";
    else if (rival.difficulty === "Medium") color = "text-[#FFBE1C]";
    else color = "text-[#ef4444]";
    return <h1 className={`${color} font-bold`}>{rival.difficulty}</h1>;
  };

  const tittleBodyTemplate = (rival) => {
    if (rival.state === "Draft") {
      return (
        <Link
          className="font-medium hover:text-primary-400"
          href={`/myRivals/${rival._id}`}
        >
          {rival.title}
        </Link>
      );
    }
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={`/rivals/${rival.title.replace(/ /g, "-")}`}
      >
        {rival.title}
      </Link>
    );
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-2 min-w-full">
        <section className="flex gap-5 justify-center min-h-11 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto mt-5">
          <Link href="/createRival">
            <Button className="bg-primary-200 px-3 h-12" label="Create rival" />
          </Link>
          <SearchBar handleChange={handleSearch} placeholder="Search Rivals" />
          <div className="flex gap-5 justify-center">
            <DropdownButtonSearch
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
                setIsOpenD(false);
              }}
              close={() => setIsOpenT(false)}
            />
            <DropdownButton
              id="difficulty"
              name="Difficulty"
              list={["Easy", "Medium", "Hard"]}
              handleChange={handleDifficulty}
              isOpen={isOpenD}
              open={() => {
                setIsOpenD(true);
                setIsOpenT(false);
              }}
              close={() => setIsOpenD(false)}
            />
            <DropdownButton
              id="state"
              name="State"
              list={["Draft", "Published"]}
              handleChange={handleState}
              isOpen={isOpenS}
              open={() => {
                setIsOpenS(true);
                setIsOpenT(false);
                setIsOpenD(false);
              }}
              close={() => setIsOpenS(false)}
            />
          </div>
        </section>
        <section className="flex flex-wrap gap-3 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto">
          {filters["difficulty"].value && (
            <Tag
              name={filters["difficulty"].value}
              deleteFilter={handleDeleteDifficulty}
            />
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
        <div className="mx-auto w-3/4">
          <DataTable
            removableSort
            value={rivals}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            filters={{ ...filters, filterTags }}
            globalFilterFields={["title", "createdBy.name"]}
            emptyMessage="No rivals found"
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
            <Column field="state" header="State" sortable></Column>
          </DataTable>
        </div>
      </main>
      <Footer />
    </>
  );
}
