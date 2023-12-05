"use client";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import Tags from "@/components/Tags";
import CodeEditor from "@/components/CodeEditor";
import { useState, useRef } from "react";
import { FileChooser } from "./FileChooser";
import { Dropdown } from "primereact/dropdown";
import { TabPanel, TabView } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

const RIVAL_KINDS = ["Algorithm", "SQL"];
const RIVAL_DIFFICULTIES = ["Easy", "Medium", "Hard"];

export default function RivalCreator({
  initialRivalData,
  onSaveDraft,
  onPublishDraft,
  onTestDraft,
  onDeleteDraft,
  kindDisabled,
  publishDisabled,
  testDisabled,
  deleteDisabled,
  downloadDisabled,
}) {
  const editorRef = useRef(null);
  const [rivalKind, setRivalKind] = useState(initialRivalData.kind);
  const [rivalData, setRivalData] = useState(initialRivalData);

  const handleChange = (attribute, value) => {
    setRivalData({ ...rivalData, [attribute]: value });
  };

  const handleSaveDraft = () => {
    const selectedUri =
      rivalKind === RIVAL_KINDS[0]
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myAlgorithmRivals`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mySqlRivals`;
    console.log(rivalData);
    onSaveDraft(rivalData, selectedUri);
  };

  const handlePublishDraft = () => {
    const selectedUri =
      rivalKind === RIVAL_KINDS[0]
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myAlgorithmRivals`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/mySqlRivals`;
    onPublishDraft(rivalData, selectedUri);
  };

  const handleTestDraft = () => {
    onTestDraft(rivalData.draftId);
  };

  const handleDeleteDraft = () => {
    const selectedUri = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myRivals`;
    onDeleteDraft(rivalData.draftId, selectedUri);
  };

  return (
    <main className="flex flex-col py-8 px-4 min-h-[90vh]">
      <section className="flex flex-col lg:flex-row gap-5 w-full flex-grow">
        <section className="border-primary w-full lg:w-1/2 rounded">
          <ScrollPanel
            pt={{ barY: "bg-primary-200" }}
            className="w-full h-[calc(90vh-3rem)]"
          >
            <section className="h-full flex flex-col flex-grow gap-6 p-7">
              <SelectButton
                className="input-primary w-max p-0"
                value={rivalKind}
                onChange={(e) => {
                  setRivalKind(e.value);
                }}
                options={RIVAL_KINDS}
                disabled={kindDisabled}
              />
              <input
                placeholder="Title"
                className="input-primary w-6/12"
                value={rivalData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Tags
                initialTags={rivalData.tags}
                setSelectedTags={(tags) => handleChange("tags", tags)}
              />
              <EditorComponent
                className="border-primary"
                markdown={rivalData.statement}
                onChange={(newMarkdown) =>
                  handleChange("statement", newMarkdown)
                }
              />
              {/* <TabView */}
              {/*   className="h-full" */}
              {/*   pt={{ */}
              {/*     inkbar: "bg-primary-200", */}
              {/*     navContent: "text-sm border-grey-200 border-b-2 rounded-t-md", */}
              {/*     nav: "h-9 bg-slate-200", */}
              {/*     panelContainer: "pl-5 py-2 pr-2 shadow-md", */}
              {/*   }} */}
              {/* > */}
              {/*   <TabPanel */}
              {/*     header="Statement" */}
              {/*     pt={{ headerAction: "pt-3 bg-slate-200" }} */}
              {/*   > */}
              {/*     <section> */}
              {/*       <EditorComponent */}
              {/*         className="border border-solid border-gray-300 rounded-md p-1" */}
              {/*         markdown={rivalData?.statement} */}
              {/*         onChange={(newMarkdown) => */}
              {/*           handleChange("statement", newMarkdown) */}
              {/*         } */}
              {/*       /> */}
              {/*     </section> */}
              {/*   </TabPanel> */}
              {/*   <TabPanel */}
              {/*     header="Solution Article" */}
              {/*     pt={{ headerAction: "pt-3 bg-slate-200" }} */}
              {/*   > */}
              {/*     <section> */}
              {/*       <EditorComponent */}
              {/*         className="border border-solid border-gray-300 rounded-md p-1" */}
              {/*         markdown={rivalData?.solutionMD} */}
              {/*         onChange={(newMarkdown) => */}
              {/*           handleChange("solutionMD", newMarkdown) */}
              {/*         } */}
              {/*       /> */}
              {/*     </section> */}
              {/*   </TabPanel> */}
              {/* </TabView> */}
            </section>
          </ScrollPanel>
        </section>
        <section className="border-primary w-full lg:w-1/2 rounded">
          <section className="h-full w-full flex flex-col gap-6 p-7">
            <section className="flex gap-5">
              <Dropdown
                className="border-primary"
                value={rivalData.difficulty}
                placeholder="Select a difficulty"
                options={RIVAL_DIFFICULTIES}
                onChange={(e) => handleChange("difficulty", e.value)}
              />
              <input
                value={rivalData.runtime}
                placeholder="Runtime"
                className="input-primary w-2/12"
                type="number"
                onChange={(e) =>
                  handleChange("runtime", parseInt(e.target.value))
                }
              />
            </section>
            <section className="flex gap-5">
              <FileChooser
                name="inputCases"
                initialFileContent={rivalData.inputCases}
                accept=".txt"
                onFileChoose={(fileContent) => {
                  handleChange("inputCases", fileContent);
                }}
                label="Input Cases"
                hidden={rivalKind === RIVAL_KINDS[1]}
                downloadDisabled={downloadDisabled}
              />
              <FileChooser
                name="sampleInputCases"
                initialFileContent={rivalData.sampleInputCases}
                accept=".txt"
                onFileChoose={(fileContent) =>
                  handleChange("sampleInputCases", fileContent)
                }
                label="Sample Input Cases"
                hidden={rivalKind === RIVAL_KINDS[1]}
                downloadDisabled={downloadDisabled}
              />
              {rivalKind === RIVAL_KINDS[1] && (
                <input
                  className="input-primary w-max"
                  defaultValue={rivalData.databaseName}
                  type="text"
                  placeholder="Database name"
                  onChange={(e) => handleChange("databaseName", e.target.value)}
                />
              )}
              <FileChooser
                name="creationScript"
                initialFileContent={rivalData.creationScript}
                accept=".txt"
                onFileChoose={(fileContent) => {
                  handleChange("creationScript", fileContent);
                }}
                label="Creation Script"
                hidden={rivalKind === RIVAL_KINDS[0]}
                downloadDisabled={downloadDisabled}
              />
            </section>
            <CodeEditor
              editorRef={editorRef}
              defaultValue={rivalData.solutionCode}
              onChange={(newCode) => handleChange("solutionCode", newCode)}
              className="flex-grow"
            />
          </section>
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
          disabled={testDisabled}
          onClick={handleTestDraft}
        />
        <Button
          className="w-32 h-12 bg-red-500 p-2"
          label="delete"
          rounded
          disabled={deleteDisabled}
          onClick={handleDeleteDraft}
        />
      </section>
    </main>
  );
}
