"use client";
import RivalCreator from "@/components/RivalCreator";
import { useRouter } from "next/navigation";

const initialRivalData = {
  tags: [],
  inputCases: "",
  title: "",
  statement: "",
  runtime: 3000,
  difficulty: "Easy",
  solutionCode: "",
  createdBy: "",
  solutionMd: "",
  creationScript: "",
  databaseName: "",
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
        router.push(`/myRivals/${data.newRival._id}`);
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
      initialRivalData={{
        ...initialRivalData,
        createdBy: sessionStorage.getItem("userId"),
      }}
      onSaveDraft={createRivalDraft}
      publishDisabled={true}
    />
  );
}
