import { useCallback, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
  themeAlpine,
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

  const myTheme = themeAlpine.withParams({
    backgroundColor: "#1f2836",
    foregroundColor: "rgba(255, 255, 255, 1)",
    headerTextColor: "white",
    headerBackgroundColor: "#2b3340",
    headerColumnResizeHandleColor: "#4b525d",
  });

  return (
    <div style={{ height: 500 }}>
      <AgGridReact
        theme={myTheme}
        rowData={Object.values(rowsMap)}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        getRowId={getRowId}
      />
    </div>
  );
};

export default TradeGrid;
