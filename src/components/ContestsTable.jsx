"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Link from "next/link";
import { Button } from "primereact/button";
import { useState } from "react";

export default function RivalsTable({ value, columns=[] , own=false}) {
  const [constests, setContests] = useState(value || []);

  const renderColumn = (columnName) => {
    switch (columnName) {
      case 'state':
        return (
          <Column
            key="state"
            field="state"
            header="State"
            sortable
          />
        );
      case 'createdBy':
        return (
          <Column
            key="createdBy.name"
            field="createdBy.name"
            header="User"
            sortable
          />
        );
      case 'remove':
        return (
          <Column
            key="remove"
            header="Remove"
            body={RemoveBodyTemplate}
          />
        )
      default:
        return null;
    }
  };

 

  const tittleBodyTemplate = (constest) => {
    return (
      <Link
        className="font-medium hover:text-primary-400"
        href={own ?`/constests/${constest.title.replace(/ /g, "-")}`: `/myContests/${constest.title.replace(/ /g, "-")}`}
      >
        {constest.title}
      </Link>
    );
  };

  const RemoveBodyTemplate = (constests) => {
    return (
      <Button
        className="p-2 bg-red-500"
        onClick={(e) => {
          e.preventDefault();
          setContests((constest)=>constests.filter((r) => r.title !== constest.title));
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
      value={constests}
      dataKey="id"
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      emptyMessage="No contests found"
      tableStyle={{ minWidth: "50rem" }}
      stripedRows
    >
      <Column
        field="title"
        header="Tittle"
        sortable
        body={tittleBodyTemplate}
      ></Column>
      <Column field="king" header="king" sortable></Column>
      {columns.map((columnName) => renderColumn(columnName))}
    </DataTable>
  );
}
