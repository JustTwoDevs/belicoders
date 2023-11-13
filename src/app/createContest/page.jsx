"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import RivalAdder from "@/components/RivalAdder";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ScrollPanel } from "primereact/scrollpanel";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

async function createContestDraft(draftData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/myContests`;
  console.log(draftData);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(draftData),
  });
  const data = await res.json();
  return data;
}

export default function CreateContest() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [rivals, setRivals] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveDraft = (e) => {
    e.preventDefault();
    const draftData = {
      title: e.target.title.value,
      description: description,
      rivals: rivals.map((rival) => rival._id),
    };
    async function postData() {
      const contestData = await createContestDraft(draftData);
      console.log(contestData);
      setIsSaving(false);
      router.push(`/myContests/${contestData._id}`);
    }
    setIsSaving(true);
    postData();
  };

  return (
    <main className="lg:max-h-[90vh]">
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSaveDraft}>
        <section className="flex flex-col lg:h-[83vh] lg:max-h-[83vh] lg:flex-row gap-5">
          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <section className="h-full flex flex-col gap-4 p-4 rounded-md">
                <InputText
                  className="border border-solid border-gray-300 w-1/2 p-1"
                  name="title"
                  placeholder="Title"
                  required={true}
                />
                <EditorComponent
                  className="flex-grow border border-solid border-gray-300 rounded-md p-1"
                  markdown={`# Statement here`}
                  onChange={(newMarkdown) => setDescription(newMarkdown)}
                />
              </section>
            </ScrollPanel>
          </section>

          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <RivalAdder
                className="h-full flex flex-col gap-4 p-4 rounded-md"
                state={[rivals, setRivals]}
              />
            </ScrollPanel>
          </section>
        </section>
        <section>
          <Button
            type="submit"
            className="w-32 h-12 bg-primary-200 p-2"
            label="Save draft"
            rounded
          />
          <Button
            className="w-32 h-12 bg-fuchsia-200 p-2"
            label="Publish"
            rounded
            disabled={true}
          />
          <Button className="w-32 h-12 bg-blue-200 p-2" label="Test" rounded />{" "}
        </section>
      </form>
    </main>
  );
}
