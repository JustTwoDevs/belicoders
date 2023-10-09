"use client";
import SearchBar from "@/components/SearchBar";
import DropdownButton from "@/components/DropdownButton";
import DropdownButtonTag from "@/components/DropDownButtonTag";
import FilterC from "@/components/FilterC";
import ProblemTable from "@/components/ProblemTable";
import { useState, useEffect } from "react";

async function getProblems(filters) {
  const query = { ...filters };
  if (query.difficulty) {
    if (query.difficulty === "Easy") query.difficulty = 1;
    else if (query.difficulty === "Medium") query.difficulty = 2;
    else if (query.difficulty === "Hard") query.difficulty = 3;
  }
  if (query.tags) query.tags = query.tags.join(",");

  const url =
    "http://localhost:3000/api/v1/problems/?" +
    new URLSearchParams(query).toString().replace(/%2C/g, ",");
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) return data;
    else alert(data.message);
  } catch (error) {
    console.log(`Error al obtener problemas: ${error.message}`);
  }
}

async function getTags() {
  try {
    const response = await fetch("http://localhost:3000/api/v1/tags", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) return data;
    else alert(data.message);
  } catch (error) {
    console.log(`Error al obtener problemas: ${error.message}`);
  }
}

export default function Problems() {
  const [filters, setFilters] = useState({});
  const [problems, setProblems] = useState([]);
  const [tags, setTags] = useState([]);
  const [isOpenD, setIsOpenD] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      const tagsJson = await getTags();
      if (Array.isArray(tagsJson)) {
        const tags = tagsJson.map((tag) => tag.name);
      }
      setTags(tags);
    }
    fetchTags();
  }, []);

  const handleDifficulty = (value) => {
    setFilters({ ...filters, difficulty: value });
  };

  const handleTag = (tag) => {
    const listTags = filters.tags ? filters.tags : [];
    listTags.push(tag);
    filters.tags = listTags;
    setFilters({ ...filters });
  };

  const handleSearch = (value) => {
    if (value == "") {
      delete filters.search;
    } else filters.search = value;
    setFilters({ ...filters });
  };

  const handleDeleteDifficulty = () => {
    delete filters.difficulty;
    setFilters({ ...filters });
  };

  const handleDeleteTag = (tag) => {
    const newTags = filters.tags.filter((t) => t !== tag);
    if (newTags.length == 0) delete filters.tags;
    else filters.tags = newTags;
    setFilters({ ...filters });
  };

  const handleResetTags = () => {
    delete filters.tags;
    setFilters({ ...filters });
  };

  useEffect(() => {
    async function fetchProblems() {
      const problemsJson = await getProblems(filters);
      setProblems(problemsJson);
    }
    fetchProblems();
  }, [filters]);

  return (
    <main className="bg-white flex justify-center">
      <section className="flex flex-col w-4/5 gap-2">
        <div className=" flex gap-5">
          <DropdownButton
            id="difficulty"
            name="Difficulty"
            list={["Easy", "Medium", "Hard"]}
            handleChange={handleDifficulty}
          />

          <DropdownButtonTag
            id="tags"
            filters={filters.tags ? filters.tags : []}
            tags={tags}
            handleAdd={handleTag}
            handleRemove={handleDeleteTag}
            handleReset={handleResetTags}
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
        <div className="flex gap-3">
          {filters.difficulty && (
            <FilterC
              name={filters.difficulty}
              deleteFilter={handleDeleteDifficulty}
            />
          )}
          {filters.tags &&
            filters.tags.map((tag, i) => (
              <FilterC key={i} name={tag} deleteFilter={handleDeleteTag} />
            ))}
        </div>
        <div >
        <ProblemTable 
        problems={problems}
        />
        </div>
      </section>
    
       
      
    </main>
  );
}
