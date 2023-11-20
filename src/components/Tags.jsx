"use client";
import DropDownButtonSearch from "./DropDownButtonSearch";
import Tag from "./Tag";
import { useState, useEffect } from "react";

async function getTags() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tags`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problemas: ${error.message}`);
  }
}

export default function Tags({ className, selectedTags, setSelectedTags }) {
  const [tags, setTags] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [isOpenT, setIsOpenT] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      const tagsJson = await getTags();
      const tags = tagsJson.map((tag) => tag.name);
      setTags(tags);
    }
    fetchTags();
  }, []);
  const handleTag = (tag) => {
    let newFilters = [...filterTags];
    newFilters.push(tag);
    setFilterTags(newFilters);
    setSelectedTags(newFilters);
  };

  const handleDeleteTag = (tag) => {
    const newTags = filterTags.filter((t) => t !== tag);
    if (newTags.length == 0) setFilterTags([]);
    else setFilterTags(newTags);
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <section className={`${className} flex flex-wrap`}>
      <DropDownButtonSearch
        className="mr-2"
        id="tags"
        filters={filterTags}
        tags={tags}
        selectedTags={selectedTags}
        handleAdd={handleTag}
        handleRemove={handleDeleteTag}
        handleReset={() => {
          setFilterTags([]);
        }}
        isOpen={isOpenT}
        open={() => {
          setIsOpenT(true);
        }}
        close={() => setIsOpenT(false)}
      />
      {filterTags.map((tag, i) => (
        <Tag key={i} name={tag} deleteFilter={handleDeleteTag} />
      ))}
    </section>
  );
}
