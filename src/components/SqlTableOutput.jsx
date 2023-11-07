import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function SqlTableOutput  ({ result })  {
  return (
    <div  className="w-full h-full text-sm ">
      <DataTable value={result} size={'small'} showGridlines tableStyle={{ minWidth: '50rem' }}>
        {Object.keys(result[0]).map((key) => (
          <Column key={key} field={key} header={key} />
        ))}
      </DataTable>
    </div>
  );
};


