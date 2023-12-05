import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function SqlTableOutput({ result }) {
  return (
    <div className="w-full h-full text-sm m-3">
      <h3 className="text-xl font-medium text-green-600 mb-2">
        Successfull Query
      </h3>
      <DataTable
        value={result}
        size={"small"}
        tableStyle={{ minWidth: "50rem" }}
        className="border-2 border-white"
      >
        {Object.keys(result[0]).map((key) => (
          <Column
            key={key}
            field={key}
            header={key}
            className="bg-[#1e1e1e] text-white"
          />
        ))}
      </DataTable>
    </div>
  );
}
