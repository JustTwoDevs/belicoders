import { useState, useEffect } from "react";
import { ScrollPanel } from "primereact/scrollpanel";
import { Checkbox } from "primereact/checkbox";

async function getSubmissions(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/rivals/${id}/submission`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else return null;
  } catch (error) {
    console.log(`Error al obtener submissions: ${error.message}`);
    return null;
  }
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export default function Submissions(props) {
  const [submissions, setSubmissions] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState({});

  useEffect(() => {
    async function fetchSubmissions() {
      const foundSubmissions = await getSubmissions(props.rivalId);
      setSubmissions(foundSubmissions);
    }
    fetchSubmissions();
  }, [props.rivalId]);

  return (
    <>
      {submissions == null ? (
        <h1 className="text-center text-gray-500">No submissions yet</h1>
      ) : (
        <ScrollPanel
          pt={{ barY: "bg-primary-200" }}
          className="w-full h-[calc(60vh-3rem)]"
        >
          <div className="mt-3">
            Only the code submitted in the current language will be displayed;
            When you select and confirm the selection, your current code will be
            overwritten by the code you selected.
          </div>
          <div class="mx-3 flex h-9 items-center border-b px-4 text-sm mt-5">
            <div class="ml-4 mr-28">Status</div>
            <div class="ml-1">Output</div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {submissions.map((submission, i) => (
              <section
                key={i}
                className={
                  "flex gap-2 items-center rounded-lg p-2 " +
                  (i % 2 == 0 ? "" : "bg-gray-200")
                }
              >
                <Checkbox
                  inputId={submission._id}
                  pt={{
                    input:
                      "border-2 border-gray-300 focus:outline h-5 w-5 rounded-full",
                  }}
                  checked={selectedSubmission._id == submission._id}
                  onChange={(e) => {
                    if (e.checked) {
                      setSelectedSubmission(submission);
                    } else {
                      setSelectedSubmission({});
                    }
                  }}
                ></Checkbox>
                <div className="flex flex-col gap-1 ml-2 mr-8">
                  {submission.state == "Accepted" ? (
                    <span className="text-sm font-semibold text-green-500">
                      {submission.state}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-red-500">
                      {submission.state}
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {timeSince(new Date(submission.createdAt))}
                  </span>
                </div>
                <span className="text-sm w-2/3">{submission.output}</span>
              </section>
            ))}
          </div>
        </ScrollPanel>
      )}
      <div className="w-full border-b border-gray-300" />
      <div className="flex flex-row-reverse items-center gap-4 mt-3">
        <button
          className={
            "py-1.5 font-medium items-center select-none rounded-lg px-3 text-sm bg-green-500 text-white hover:bg-green-600" +
            (selectedSubmission._id ? "" : " opacity-70 cursor-not-allowed")
          }
          onClick={() => props.onSetSub(selectedSubmission)}
          disabled={!selectedSubmission._id}
        >
          Confirm
        </button>
        <button
          className="py-1.5 font-medium items-center select-none rounded-lg px-3 text-sm bg-[#383c40] hover:bg-[#52585e] text-white"
          onClick={() => props.onCancel()}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
