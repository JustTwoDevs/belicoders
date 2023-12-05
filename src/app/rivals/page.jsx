"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import DropdownButtonSearch from "@/components/DropDownButtonSearch";
import Tag from "@/components/Tag";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import Link from "next/link";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

async function getRivals(filtersTags) {
  const query = {};
  if (filtersTags.length) query.tags = filtersTags.join(",");

  const url = `${process.env.NEXT_PUBLIC_API_URL
    }/api/v1/rivals/?${new URLSearchParams(query)
      .toString()
      .replace(/%2C/g, ",")}`;
  console.log(url);
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

async function getTags() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problemas: ${error.message}`);
  }
}

export default function Problems() {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    difficulty: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [filterTags, setFilterTags] = useState([]);
  const [rivals, setRivals] = useState([]);
  const [tags, setTags] = useState([]);
  const [isOpenD, setIsOpenD] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      const tagsJson = await getTags();
      const tags = tagsJson.map((tag) => tag.name);
      setTags(tags);
    }
    fetchTags();
  }, []);

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

  useEffect(() => {
    async function fetchRivals() {
      const rivalsJson = await getRivals(filterTags);
      console.log(rivalsJson);
      setRivals(rivalsJson);
    }
    fetchRivals();
  }, [filterTags]);

  const difficultyBodyTemplate = (rival) => {
    let color;
    if (rival.difficulty === "Easy") color = "text-[#00b8a3]";
    else if (rival.difficulty === "Medium") color = "text-[#FFBE1C]";
    else color = "text-[#ef4444]";
    return <h1 className={`${color} font-bold`}>{rival.difficulty}</h1>;
  };

  const tittleBodyTemplate = (rival) => {
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={`/rivals/${rival.title.replace(/ /g, "-")}`}
      >
        {rival.title}
      </Link>
    );
  };

  const createdByBodyTemplate = (rival) => {
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={`/profile/${rival.createdBy._id}`}
      >
        {rival.createdBy.name}
      </Link>
    );
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-2 min-w-full">
        <section className="flex flex-wrap gap-5 justify-center min-h-11 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto mt-5">
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
          </div>
        </section>
        <section className="flex flex-wrap gap-3 lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto">
          {filters["difficulty"].value && (
            <Tag
              name={filters["difficulty"].value}
              deleteFilter={handleDeleteDifficulty}
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
            filters={filters}
            globalFilterFields={["title", "createdBy.name"]}
            emptyMessage="No rivals found"
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="title"
              header="Tittle"
              sortable
              body={tittleBodyTemplate}
            ></Column>
            <Column
              field="createdBy.name"
              header="User"
              body={createdByBodyTemplate}
              sortable
            ></Column>
            <Column
              field="difficulty"
              header="Difficulty"
              body={difficultyBodyTemplate}
              sortable
            ></Column>
            <Column
              field="avgGrade"
              header="Grade"
              sortable
              style={{ width: "10%" }}
            ></Column>
          </DataTable>
        </div>
      </main>
      <Footer />
    </>
  );
}
