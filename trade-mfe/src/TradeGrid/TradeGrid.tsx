import { useCallback, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { colDefs, defaultColDef } from "./columnDef";

import type { RowsMap } from "../types";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type GridProps = {
  rowsMap: RowsMap;
};
const TradeGrid = ({ rowsMap }: GridProps) => {
  console.log("hello", rowsMap);

  const getRowId = useCallback<GetRowIdFunc>(
    ({ data: { ticker } }: GetRowIdParams) => ticker,
    []
  );

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        rowData={Object.values(rowsMap)}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        getRowId={getRowId}
      />
    </div>
  );
};

export default TradeGrid;
