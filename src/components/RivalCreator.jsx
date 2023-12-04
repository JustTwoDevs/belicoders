"use client";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import EditorComponent from "@/components/EditorComponent";
import Tags from "@/components/Tags";
import CodeEditor from "@/components/CodeEditor";
import { useState, useRef } from "react";

const RIVAL_KINDS = ["Algorithm", "SQL"];

export default function RivalCreator({
  initialRivalData,
  onSaveDraft,
  onPublishDraft,
  onTestDraft,
  publishDisabled,
}) {
  const editorRef = useRef(null);
  const [rivalKind, setRivalKind] = useState(RIVAL_KINDS[0]);
  const [rivalData, setRivalData] = useState(initialRivalData);

  const handleChange = (attribute, value) => {
    setRivalData({ ...rivalData, [attribute]: value });
  };

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
      };
      reader.readAsText(file);
    }
  };
  const handleSaveDraft = (e) => {
    const selectedUri =
      rivalKind === RIVAL_KINDS[0]
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myAlgorithmRivals`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mySqlRivals`;
    console.log(rivalData);
    onSaveDraft(rivalData, selectedUri);
  };

  const handlePublishDraft = (e) => {
    const selectedUri =
      rivalKind === RIVAL_KINDS[0]
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myAlgorithmRivals`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mySqlRivals`;
  };

  const handleTestDraft = (e) => {};

  return (
    <main className="flex flex-col py-8 px-4 min-h-[90vh]">
      <section className="flex flex-col lg:flex-row gap-5 w-full flex-grow">
        <section className="w-full lg:w-1/2 border border-solid border-gray-300 rounded">
          <form className="h-full flex flex-col flex-grow gap-10 p-7">
            <SelectButton
              value={rivalKind}
              onChange={(e) => setRivalKind(e.value)}
              options={RIVAL_KINDS}
            />
            <input
              placeholder="Title"
              className="border border-gray-200"
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Tags
              className="border border-gray-200"
              selectedTags={rivalData.tags}
              setSelectedTags={(tags) => handleChange("tags", tags)}
            />
            <EditorComponent
              className="flex-grow border border-gray-200 overflow-y-scroll"
              markdown={rivalData.statement}
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
              value={rivalData.runtime}
              placeholder="Runtime"
              className="border border-gray-200"
              onChange={(e) =>
                handleChange("runtime", parseInt(e.target.value))
              }
            />
            {rivalKind === RIVAL_KINDS[1] && (
              <input
                value={rivalData.databaseName}
                type="text"
                placeholder="Database name"
                onChange={(e) => handleChange("databaseName", e.target.value)}
              />
            )}
            <input type="file" accept=".txt" onChange={handleFileSelect} />
            <CodeEditor
              editorRef={editorRef}
              onChange={(newCode) => handleChange("solutionCode", newCode)}
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
          onClick={handleSaveDraft}
        />

        <Button
          className="w-32 h-12 bg-fuchsia-200 p-2"
          label="Publish"
          rounded
          disabled={publishDisabled}
          onClick={handlePublishDraft}
        />
        <Button
          className="w-32 h-12 bg-blue-200 p-2"
          label="Test"
          rounded
          onClick={handleTestDraft}
        />
      </section>
    </main>
  );
}
