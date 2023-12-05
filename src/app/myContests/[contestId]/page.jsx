"use client";
import ContestCreator from "@/components/contestCreator";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function CreateContest({ params }) {
  const router = useRouter();
  const [draft, setDraft] = useFetch(
    `api/v1/myContests/${params.contestId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
    {
      errorMessage: "Error al cargar el draft",
      callback: (contestDraft) => {
        const initialContestData = {
          draftId: contestDraft._id,
          title: contestDraft.title || "",
          description: contestDraft.description || "",
          rivals: contestDraft.rivals || [],
        };
        setDraft(initialContestData);
      },
    },
  );

  async function patchContestDraft(body) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myContests/${body.draftId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Contest Draft patched");
      } else if (data.errors?.length > 0) {
        data.errors.forEach((error) => {
          alert(error.message);
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(`Error al actualizar borrador ${error.message}`);
    }
  }

  async function publishContestDraft(body) {
    await patchContestDraft(body);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myContests/${body.draftId}/publish`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.push("/myContests");
      } else if (data.errors?.length > 0) {
        data.errors.forEach((error) => {
          alert(error.message);
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(`Error al publicar borrador ${error.message}`);
    }
  }

  async function deleteContestDraft(draftId) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myContests/${draftId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.push("/myContests");
      } else if (data.errors?.length > 0) {
        data.errors.forEach((error) => {
          alert(error.message);
        });
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(`Error al eliminar borrador ${error.message}`);
    }
  }

  return (
    draft && (
      <ContestCreator
        initialContestData={draft}
        onSaveDraft={patchContestDraft}
        onPublishDraft={publishContestDraft}
        onDeleteDraft={deleteContestDraft}
      />
    )
  );
}
