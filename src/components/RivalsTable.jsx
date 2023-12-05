"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { Button } from "primereact/button";
import { useState } from "react";

export default function RivalsTable({
  state,
  value,
  columns = [],
  own = false,
}) {
  const [rivals, setRivals] = state ? state : value || null;

  const renderColumn = (columnName) => {
    switch (columnName) {
      case "state":
        return <Column key="state" field="state" header="State" sortable />;
      case "createdBy":
        return (
          <Column
            key="createdBy.name"
            field="createdBy.name"
            header="User"
            sortable
          />
        );
      case "remove":
        return (
          <Column key="remove" header="Remove" body={RemoveBodyTemplate} />
        );
      default:
        return null;
    }
  };

  const difficultyBodyTemplate = (rival) => {
    let color;
    if (rival.difficulty === "Easy") color = "text-[#00b8a3]";
    else if (rival.difficulty === "Medium") color = "text-[#FFBE1C]";
    else color = "text-[#ef4444]";
    return <h1 className={`${color} font-bold`}>{rival.difficulty}</h1>;
  };

  const tittleBodyTemplate = (rival) => {
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={
          own
            ? `/rivals/${rival.title.replace(/ /g, "-")}`
            : `/myRivals/${rival.title.replace(/ /g, "-")}`
        }
      >
        {rival.title}
      </Link>
    );
  };

  const RemoveBodyTemplate = (rival) => {
    return (
      <Button
        className="p-2 bg-red-500"
        onClick={(e) => {
          e.preventDefault();
          setRivals((rivals) => rivals.filter((r) => r.title !== rival.title));
        }}
      >
        Remove
      </Button>
    );
  };

  return (
    <DataTable
      className="flex-grow border border-solid border-gray-300 rounded-md p-1"
      removableSort
      value={rivals}
      dataKey="id"
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      emptyMessage="No rivals found"
      tableStyle={{ minWidth: "50rem" }}
      stripedRows
    >
      <Column
        field="title"
        header="Tittle"
        sortable
        body={tittleBodyTemplate}
      ></Column>
      <Column
        field="difficulty"
        header="Difficulty"
        body={difficultyBodyTemplate}
        sortable
      ></Column>
      <Column field="avgGrade" header="Grade" sortable></Column>
      {columns.map((columnName) => renderColumn(columnName))}
    </DataTable>
  );
}
