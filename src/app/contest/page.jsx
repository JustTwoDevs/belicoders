"use client";
import SearchBar from "@/components/SearchBar";
import ProblemTable from "@/components/ProblemTable";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

async function getContest(search) {
  let url = "http://localhost:3000/api/v1/contest/";
  if (search !== "") url += "?search=" + search;

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
    console.log(`Error to get contest: ${error.message}`);
  }
}

export default function Problems() {
  const [contest, setContest] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    async function fetchContest() {
      const contestJson = await getContest(search);
      console.log(contestJson);
      setContest(contestJson);
    }
    fetchContest();
  }, [search]);

  return (
    <>
      <main className="bg-white min-h-screen flex flex-col gap-2">
        <SearchBar handleChange={handleSearch} placeholder="Search Contest" />
        <ProblemTable problems={contest} />
      </main>
      <Footer />
    </>
  );
}
