"use client";
import RivalCreator from "@/components/RivalCreator";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";

export default function MyRivalDraft({ params }) {
  const router = useRouter();
  const [rivalDraft, setRivalDraft] = useFetch(
    `api/v1/myRivals/${params.rivalId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
    {
      errorMessage: "Error al obtener borrador",
      callback: (rivalDraft) => {
        rivalDraft.tags = rivalDraft.tags.map((tag) => tag.name);
        const initialRivalData = {
          draftId: rivalDraft._id,
          kind: rivalDraft.__t === "AlgorithmRival" ? "Algorithm" : "SQL",
          tags: rivalDraft.tags || [],
          inputCases: rivalDraft.inputCases || "",
          title: rivalDraft.title || "",
          statement: rivalDraft.statement || "",
          runtime: rivalDraft.runtime || "",
          difficulty: rivalDraft.difficulty || "",
          solutionCode: rivalDraft.solutionCode || "",
          solutionMd: rivalDraft.solutionMd || "",
          creationScript: rivalDraft.creationScript || "",
          databaseName: rivalDraft.databaseName || "",
        };
        setRivalDraft(initialRivalData);
      },
    },
  );

  async function patchRivalDraft(body, url) {
    try {
      const response = await fetch(`${url}/${body.draftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        alert("Rival Draft patched");
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

  async function publishRivalDraft(body, url) {
    await patchRivalDraft(body, url);
    try {
      const response = await fetch(`${url}/${body.draftId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.push("/myRivals");
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

  function testRivalDraft(draftId) {
    router.push(`/myRivals/${draftId}/test`);
  }

  async function deleteRivalDraft(draftId, url) {
    try {
      const response = await fetch(`${url}/${draftId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.push("/myRivals");
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
    rivalDraft && (
      <RivalCreator
        initialRivalData={rivalDraft}
        onSaveDraft={patchRivalDraft}
        onPublishDraft={publishRivalDraft}
        onTestDraft={testRivalDraft}
        onDeleteDraft={deleteRivalDraft}
        kindDisabled
      />
    )
  );
}
