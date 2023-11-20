import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ShowMD = dynamic(() => import("./ShowMD"), {
  ssr: false,
});

const ReplieEditor = dynamic(() => import("./ReplieEditor"), {
  ssr: false,
});

const markdown = "Write a replie...";

export default function Discuss({ discuss, key, onChange }) {
  const router = useRouter();
  const [showReplies, setShowReplies] = useState(false);
  const [showReplieEditor, setShowReplieEditor] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const id = sessionStorage.getItem("userId");

  async function discussFetch(markdown) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discuss/${discuss._id}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: markdown }),
      });

      const data = await response.json();
      if (response.ok) {
        onChange();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setShowReplieEditor(!showReplieEditor);
        return true;
      } else return false;
    } catch (error) {
      console.log(`Error al crear discussion: ${error.message}`);
    }
  }

  async function deleteDiscuss() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discuss/${discuss._id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) onChange();
      else console.log(data.message);
    } catch (error) {
      console.log(`Error al eliminar discussion: ${error}`);
    }
  }

  async function editDiscuss(markdown) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/discuss/${discuss._id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: markdown }),
      });

      if (response.ok) {
        onChange();
        await new Promise((resolve) => setTimeout(resolve, 500));
        setShowEdit(!showEdit);
        return true;
      } else return false;
    } catch (error) {
      console.log(`Error al editar la discussion: ${error.message}`);
    }
  }

  return (
    <>
      {showEdit ? (
        <div className="ml-5">
          {" "}
          <ReplieEditor
            markdown={discuss.content}
            comment={editDiscuss}
            cancel={() => setShowEdit(!showEdit)}
          />{" "}
        </div>
      ) : (
        <article key={key} className="flex w-full flex-col px-3 py-2">
          <div className="flex w-full justify-between items-center">
            <h1 className="font-medium text-base">{discuss.userId.username}</h1>
            <h1 className="font-sans text-sm">
              {new Date(discuss.createdAt).toLocaleDateString()}
            </h1>
          </div>
          <Suspense fallback={null}>
            <ShowMD markdown={discuss.content} />
          </Suspense>
          <section className="flex items-center gap-4 my-2">
            {discuss.replies.length > 0 && (
              <div
                className="flex items-center gap-1 cursor-pointer text-xs hover:text-blue-600"
                onClick={() => setShowReplies(!showReplies)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path d="M11.997 21.5a9.5 9.5 0 01-8.49-5.251A9.38 9.38 0 012.5 11.997V11.5c.267-4.88 4.12-8.733 8.945-8.999L12 2.5a9.378 9.378 0 014.25 1.007A9.498 9.498 0 0121.5 12a9.378 9.378 0 01-.856 3.937l.838 4.376a1 1 0 01-1.17 1.17l-4.376-.838a9.381 9.381 0 01-3.939.856zm3.99-2.882l3.254.623-.623-3.253a1 1 0 01.09-.64 7.381 7.381 0 00.792-3.346 7.5 7.5 0 00-4.147-6.708 7.385 7.385 0 00-3.35-.794H11.5c-3.752.208-6.792 3.248-7.002 7.055L4.5 12a7.387 7.387 0 00.794 3.353A7.5 7.5 0 0012 19.5a7.384 7.384 0 003.349-.793 1 1 0 01.639-.09z"></path>
                </svg>
                {showReplies
                  ? "Hide Replies"
                  : `Show ${discuss.replies.length} Replies`}
              </div>
            )}
            <div
              className="flex items-center gap-1 cursor-pointer text-xs hover:text-primary-300"
              onClick={() => setShowReplieEditor(!showReplieEditor)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                <path d="M5.83 2.106c.628-.634 1.71-.189 1.71.704v2.065c4.821.94 6.97 4.547 7.73 8.085l-.651.14.652-.134c.157.757-.83 1.192-1.284.565l-.007-.009c-1.528-2.055-3.576-3.332-6.44-3.502v2.352c0 .893-1.082 1.338-1.71.704L1.091 8.295a1 1 0 010-1.408l4.737-4.78zm7.303 8.617C12.08 8.495 10.204 6.68 7.046 6.14c-.47-.08-.84-.486-.84-.99V3.62L2.271 7.591l3.934 3.971V9.667a.993.993 0 011.018-.995c2.397.065 4.339.803 5.909 2.051z"></path>
              </svg>
              Reply
            </div>
            {id === discuss.userId._id && (
              <div
                className="flex items-center gap-1 cursor-pointer text-xs hover:text-red-600"
                onClick={() => deleteDiscuss()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path d="M20 5h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v1H4a1 1 0 000 2h1v12a3 3 0 003 3h8a3 3 0 003-3V7h1a1 1 0 100-2zm-6-1v1h-4V4h4zm-5 6a1 1 0 012 0v7a1 1 0 11-2 0v-7zm4 0a1 1 0 112 0v7a1 1 0 11-2 0v-7zM7 7h10v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7z"></path>
                </svg>
                Delete
              </div>
            )}
            {id === discuss.userId._id && (
              <div
                className="flex items-center gap-1 cursor-pointer text-xs hover:text-blue-600"
                onClick={() => setShowEdit(!showEdit)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  <path d="M11 20a1 1 0 011-1h8a1 1 0 110 2h-8a1 1 0 01-1-1zM17.018 5c-.26 0-.51.104-.695.288L4.837 16.773l-.463 1.853 1.853-.463L17.712 6.677A.981.981 0 0017.018 5zm-2.11-1.126a2.983 2.983 0 014.219 4.217L7.444 19.773a1 1 0 01-.464.263l-3.738.934a1 1 0 01-1.213-1.212l.934-3.739a1 1 0 01.263-.464L14.91 3.874z"></path>
                </svg>
                Edit
              </div>
            )}
          </section>
          {showReplieEditor && (
            <div className="ml-5">
              {" "}
              <ReplieEditor markdown={markdown} comment={discussFetch} />{" "}
            </div>
          )}
          {showReplies &&
            discuss.replies?.map((reply, i) => (
              <div key={i} className="w-full rounded-md ml-5 mt-4">
                <Discuss discuss={reply} key={i} onChange={onChange} />
              </div>
            ))}
        </article>
      )}
    </>
  );
}
