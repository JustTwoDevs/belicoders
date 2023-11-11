"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import RivalAdder from "@/components/RivalAdder";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
    <main>
      <form className="flex flex-col gap-10" onSubmit={handleSaveDraft}>
        <section>
          <InputText name="title" placeholder="Title" required={true} />
          <section className="lg:grid lg:grid-cols-2">
            <EditorComponent
              className="flex-grow border border-gray-200 overflow-y-scroll"
              markdown={`# Statement here`}
              onChange={(newMarkdown) => setDescription(newMarkdown)}
            />
            <RivalAdder state={[rivals, setRivals]} />
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
