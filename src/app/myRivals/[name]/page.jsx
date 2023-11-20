"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import EditorComponent from "@/components/EditorComponent";
import Tags from "@/components/Tags";
import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

async function getRival(name) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${name}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

const options = ["AlgorithmRival", "SqlRival"];

export default function CreateRival({ params }) {
  const [rival, setRival] = useState({
    title: "",
    tags: [],
    statement: "",
    runtime: 0,
    solutionCode: "",
  });

  const handleChange = (attribute, value) => {
    setRival((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  useEffect(() => {
    async function fetchRival() {
      const foundRival = await getRival(params.name);
      setRival(foundRival);
      console.log(foundRival);
      console.log(foundRival.statement);
    }
    fetchRival();
  }, [params.name]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const fileContent = e.target.result;

        if (rival.__t === "AlgorithmRival") {
          handleChange("inputCases", fileContent);
        } else {
          handleChange("creationScript", fileContent);
        }
      };
    }
  };
  const userId = "6525c8ea197640544e9f48e8";
  const urlA = `http://localhost:3000/api/v1/users/${userId}/algorithmRivals/${rival._id}`;
  const urlS = `http://localhost:3000/api/v1/users/${userId}/sqlRivals/${rival._id}`;
  const publishA = `http://localhost:3000/api/v1/algorithmRivals/${rival._id}`;
  const publishS = `http://localhost:3000/api/v1/sqlRivals/${rival._id}`;
  const editorRef = useRef(null);

  function updateRival() {
    if (rival.__t === "AlgorithmRival") {
      updateTypeRival(rival, urlA);
    } else {
      updateTypeRival(rival, urlS);
    }
  }

  function publishRival() {
    if (rival.__t === "AlgorithmRival") {
      updateAlgorithmRival(rival, publishA);
    } else {
      updateSqlRival(rival, publishS);
    }
  }

  async function updateTypeRival(body, url) {
    console.log(body);
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      alert(data.message);
    }
  }
  return (
    <main className="flex flex-col py-8 px-4 min-h-[90vh]">
      <section className="flex flex-col lg:flex-row gap-5 w-full flex-grow">
        <section className="w-full lg:w-1/2 border border-solid border-gray-300 rounded">
          <form className="h-full flex flex-col flex-grow gap-10 p-7">
            <SelectButton value={rival.__t} options={options} />
            <InputText
              placeholder="Title"
              type="text"
              className="border border-gray-200"
              value={rival.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <Tags
              className="border border-gray-200"
              selectedTags={rival.tags}
              setSelectedTags={(tags) => handleChange("tags", tags)}
            />
            <EditorComponent
              className="flex-grow border border-gray-200 overflow-y-scroll"
              markdown={"# Statement\n" + rival.statement}
              onChange={(newMarkdown) => handleChange("statement", newMarkdown)}
            />
          </form>
        </section>
        <section className="w-full lg:w-1/2 border border-solid border-gray-300 rounded">
          <form
            className="h-full w-full flex flex-col gap-10 p-7"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputNumber
              placeholder="Runtime"
              className="border border-gray-200"
              onChange={(e) => handleChange(e.value, "runtime")}
              value={rival.runtime}
            />
            <input type="file" accept=".txt" onChange={handleFileSelect} />
            <CodeEditor
              editorRef={editorRef}
              defaultValue={rival.solutionCode}
              onChange={(solution) => {
                handleChange("solutionCode", solution);
              }}
              className="flex-grow"
            />
          </form>
        </section>
      </section>
      <section className="flex gap-5 p-5 justify-end w-full">
        <Button
          className="w-32 h-12 bg-primary-200 p-2"
          label="Save draft"
          rounded
          onClick={updateRival}
        />

        <Button
          className="w-32 h-12 bg-fuchsia-200 p-2"
          label="Publish"
          rounded
          onClick={publishRival}
        />
        <Button className="w-32 h-12 bg-blue-200 p-2" label="Test" rounded />
      </section>
    </main>
  );
}
