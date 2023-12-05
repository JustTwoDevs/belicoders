"use client";
import { useRouter } from "next/navigation";
import ContestCreator from "@/components/contestCreator";

const initialContestData = {
  title: "",
  description: "# Write your description here",
  rivals: [],
};

export default function CreateContest() {
  const router = useRouter();

  async function createContestDraft(draftData) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myContests`;
      console.log(draftData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(draftData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("contest Draft Saved");
        router.push(`/myContests/${data.newContest._id}`);
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
    <ContestCreator
      initialContestData={initialContestData}
      onSaveDraft={createContestDraft}
      publishDisabled
      deleteDisabled
    />
  );
}
