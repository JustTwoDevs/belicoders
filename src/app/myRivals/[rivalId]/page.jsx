"use client";
import { useEffect } from "react";
import RivalCreator from "@/components/RivalCreator";

async function getMyRival(rivalId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myRivals/${rivalId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) return data;
    else if (data.errors?.length > 0) {
      data.errors.forEach((error) => {
        alert(error.message);
      });
    }
    else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.log(`Error al obtener problema: ${error.message}`);
  }
}

export default function MyRivalDraft({ params }) {
  const [rivalDraft, setRivalDraft] = useState(null);

  useEffect(() => {
    async function fetchMyRival() {
      const myRival = await getMyRival(params.rivalId);
      setRivalDraft(myRival);
      console.log(myRival);
    }
    fetchMyRival();
  }, [params.rivalId]);

  async function patchRivalDraft(body, url) {
    try {
      console.log(body)
      const response = await fetch(url, {
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
      console.error(`Error al actualizar borrador ${error.message}`)
    }
  }

  return (
    <RivalCreator initialRivalData={rivalDraft} onSaveDraft={patchRivalDraft} onPublishDraft={} onTestDraft={} publishDisabled={false} />
  );
}
