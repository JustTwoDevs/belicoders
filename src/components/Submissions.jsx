import { useState, useEffect } from "react";

async function getSubmissions(id) {
  const url = `http://localhost:3000/api/v1/rivals/${id}/submission`;

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

export default function Submissions(props) {
  const [submissions, setSubmissions] = useState(null);

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
        <div className="flex flex-col gap-2">
          {submissions.map((submission, i) => (
            <section
              key={i}
              className="flex flex-col gap-2 items-center bg-gray-200 rounded-md p-2"
            >
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold">
                  {submission.userId.username}
                </h1>
                <h1 className="text-xs text-gray-500">
                  {new Date(submission.createdAt).toLocaleString()}
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold">
                  {submission.state == "Accepted" ? (
                    <span className="text-green-500">Accepted</span>
                  ) : (
                    <span className="text-red-500">Wrong Answer</span>
                  )}
                </h1>
                <h1 className="text-xs text-gray-500">{submission.output}</h1>
              </div>
              <h1 className="text-sm font-semibold">{submission.code}</h1>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
