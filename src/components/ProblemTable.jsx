import React from "react";

function ProblemTable({ problems }) {
  return (
    <div className=" align-middle px-4 py-2 text-center">
      <table className="min-w-full ">
        <thead>
          <tr>
          <th className="w-1/4">Title</th>
            <th className="w-1/4">Difficulty</th>
            <th className="w-3/8">Tags</th>
            <th className="w-1/8">Average Grade</th>
          </tr>
        </thead>
        <tbody>
          { Array.isArray(problems) && problems.map((problem, index) => (
            <tr
              key={index}
              className={`text-center align-middle ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
              }`}
            >
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td>
              {Array.isArray(problem.tags) ? problem.tags.map(tag => tag.name).join(", ") : ""}
              </td>

              <td>{problem.averageGrade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProblemTable;
