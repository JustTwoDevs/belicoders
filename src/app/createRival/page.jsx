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
import { useRouter } from "next/navigation";

const options = ["Algorithm", "Sql"];

export default function CreateRival() {
  const userId = "6525c8ea197640544e9f48e8";
  const router = useRouter();
  const editorRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [databaseName, setDatabaseName] = useState("");
  const [rivalKind, setRivalKind] = useState(options[0]);
  const [title, setTitle] = useState("");
  const [statement, setStatement] = useState("");
  const [runtime, setRuntime] = useState(110);
  const [difficulty, setDifficulty] = useState("Easy");
  const [solutionCode, setSolutionCode] = useState("");
  const [inputCases, setInputCases] = useState("");
  const [createdBy, setCreatedBy] = useState(userId);
  const [creationScript, setCreationScript] = useState("");
  const AlgorithmData = {
    tags,
    inputCases,
    title,
    statement,
    runtime,
    difficulty,
    solutionCode,
    createdBy,
  };
  const SqlData = {
    tags,
    creationScript,
    title,
    statement,
    runtime,
    difficulty,
    solutionCode,
    createdBy,
    databaseName
  }
  

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        if (rivalKind === "Algorithm") {
          setInputCases(fileContent);
        } else {
          setCreationScript(fileContent);
        }

     
    }
    reader.readAsText(file);
  };

  function createRival() {
    const urlA = `http://localhost:3000/api/v1/users/${userId}/algorithmRivals`;
    const urlS = `http://localhost:3000/api/v1/users/${userId}/sqlRivals`;
    if (rivalKind === "Algorithm") {
      createTypeRival(AlgorithmData, urlA);
    } else {
      createTypeRival(SqlData, urlS);
    }
  }

  async function createTypeRival(body, url) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);

      router.push(`/myRivals/${data.newRival.title}`);
    } else {
      alert(data.message);
    }
  }
  return (
    <main className="flex flex-col py-8 px-4 min-h-[90vh]">
      <section className="flex flex-col lg:flex-row gap-5 w-full flex-grow">
        <section className="w-full lg:w-1/2 border border-solid border-gray-300 rounded">
          <form className="h-full flex flex-col flex-grow gap-10 p-7">
            <SelectButton
              value={rivalKind}
              onChange={(e) => setRivalKind(e.value)}
              options={options}
            />
            <InputText
              placeholder="Title"
              className="border border-gray-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Tags
              className="border border-gray-200"
              selectedTags={tags}
              setSelectedTags={setTags}
            />
            <EditorComponent
              className="flex-grow border border-gray-200 overflow-y-scroll"
              markdown={`# Statement here`}
              onChange={(newMarkdown) => setStatement(newMarkdown)}
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
              onChange={(e) => setRuntime(e.value)}
            />
          <input type="file" accept=".txt" onChange={handleFileSelect} />
          <input type="text" placeholder="Database name"
          onChange={
            (e) => setDatabaseName(e.target.value)
          } />
            <CodeEditor
              editorRef={editorRef}
              onChange={(solution) => {
                setSolutionCode(solution);
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
          onClick={createRival}
        />

        <Button
          className="w-32 h-12 bg-fuchsia-200 p-2"
          label="Publish"
          rounded
          disabled={true}
        />
        <Button className="w-32 h-12 bg-blue-200 p-2" label="Test" rounded />
      </section>
    </main>
  );
}
}