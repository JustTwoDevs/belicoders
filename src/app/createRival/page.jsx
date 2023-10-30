"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from "primereact/selectbutton";
import EditorComponent from "@/components/EditorComponent";
import Tags from "@/components/Tags";
import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";

const options = ["Algorithm", "Sql"];

export default function CreateRival() {
  const [rivalKind, setRivalKind] = useState(options[0]);
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
            <InputText placeholder="Title" className="border border-gray-200" />
            <Tags />
            <EditorComponent
              className="flex-grow border border-gray-200 overflow-y-scroll"
              markdown={`# Statement here`}
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
            />
            <FileUpload
              name="demo[]"
              url={"/api/upload"}
              multiple
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
            <CodeEditor className="flex-grow" />
          </form>
        </section>
      </section>
      <section className="flex gap-5 p-5 justify-end w-full">
        <Button
          className="w-32 h-12 bg-primary-200 p-2"
          label="Save draft"
          rounded
        />
        <Button
          className="w-32 h-12 bg-fuchsia-200 p-2"
          label="Publish"
          rounded
        />
        <Button className="w-32 h-12 bg-blue-200 p-2" label="Test" rounded />
      </section>
    </main>
  );
}
