"use client";
import RivalCreator from "@/components/RivalCreator";
import { useRouter } from "next/navigation";

const initialRivalData = {
  kind: "Algorithm",
  tags: [],
  title: "",
  statement: "",
  runtime: 3000,
  difficulty: "Easy",
  solutionCode: "",
  solutionMd: "",
  creationScript: "",
  databaseName: "",
  inputCases: "",
  sampleInputCases: "",
};

export default function CreateRival() {
  const router = useRouter();

  async function createRivalDraft(body, uri) {
    try {
      const response = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        alert("Rival Draft Saved");
        console.log(data);
      } else if (data.errors?.length > 0) {
        data.errors.forEach((error) => {
          alert(error.message);
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(`Error al crear rival: ${error.message}`);
    }
  }

  return (
    <RivalCreator
      initialRivalData={initialRivalData}
      onSaveDraft={createRivalDraft}
      publishDisabled
      deleteDisabled
      testDisabled
      downloadDisabled
    />
  );
}
