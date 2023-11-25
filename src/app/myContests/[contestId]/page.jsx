"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import RivalAdder from "@/components/RivalAdder";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollPanel } from "primereact/scrollpanel";

const EditorComponent = dynamic(() => import("@/components/EditorComponent"), {
  ssr: false,
});

async function getContestDraft(draftId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/myContests/${draftId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
}

async function patchContestDraft(draftData) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/myContests/${draftData.id}`;
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(draftData),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      alert("Error updating contest draft");
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function CreateContest({ params }) {
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    rivals: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchDraft() {
      const fetchedDraft = await getContestDraft(params.contestId);
      setDraft(fetchedDraft);
      setIsLoading(false);
    }
    fetchDraft();
  }, [params.contestId]);

  const handlePatchDraft = (e) => {
    e.preventDefault();
    const draftData = {
      id: params.contestId,
      title: e.target.title.value,
      description: draft.description,
      rivals: draft.rivals.map((rival) => rival._id),
    };
    async function patchData() {
      const contestData = await patchContestDraft(draftData);
      alert("Draft saved");
      console.log(contestData);
      setIsSaving(false);
    }
    setIsSaving(true);
    patchData();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main>
      <form className="flex flex-col gap-10" onSubmit={handlePatchDraft}>
        <section className="flex flex-col lg:h-[83vh] lg:max-h-[83vh] lg:flex-row gap-5">
          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <section className="h-full flex flex-col gap-4 p-4 rounded-md">
                <InputText
                  className="border border-solid border-gray-300 w-1/2 p-1"
                  value={draft.title}
                  name="title"
                  placeholder="Title"
                  required={true}
                />
                <EditorComponent
                  className="flex-grow border border-solid border-gray-300 rounded-md p-1"
                  markdown={draft.description}
                  onChange={(newMarkdown) =>
                    setDraft({ ...draft, description: newMarkdown })
                  }
                />
              </section>
            </ScrollPanel>
          </section>

          <section className="lg:w-1/2 lg:h-full lg:max-h-full border boder-solid border-gray-300 rounded md">
            <ScrollPanel pt={{ barY: "bg-primary-200" }} className="h-full">
              <RivalAdder
                className="h-full flex flex-col gap-4 p-4 rounded-md"
                state={[
                  draft.rivals,
                  (value) => setDraft({ ...draft, rivals: value }),
                ]}
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
