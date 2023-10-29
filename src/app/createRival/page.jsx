'use client';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { SelectButton } from "primereact/selectbutton";
import EditorComponent from "@/components/EditorComponent";
import Tags from "@/components/Tags";
import CodeEditor from "@/components/CodeEditor";
import { useState } from "react";

export default function CreateRival() {
  const[rivalKind, setRivalKind] = useState("Algorithm");
  return (
    <main className="flex flex-col  py-8 px-4 min-h-screen ">
      <section className="flex flex-col lg:flex-row gap-5 w-full h-[82vh]">
        <section className="w-full h-full border border-solid border-gray-300 rounded">
          <form className="flex flex-col gap-10 p-7">
          <SelectButton value={rivalKind} onChange={(e) => setRivalKind(e.rivalKind)}
          options={["Algorithm", "sql"]}  />
            <InputText placeholder="Title" className="border border-gray-200" />
            <EditorComponent
              className="border border-gray-200"
              markdown={`# Statement here`}
            />
            <Tags />
          </form>
        </section>
        <section className="w-full h-full border border-solid border-gray-300 rounded">
          <form className="flex flex-col gap-10 p-7">
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
            <CodeEditor />
          </form>
        </section>
      </section>
      <section className="flex gap-5 p-5 justify-end w-full h-full">
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
