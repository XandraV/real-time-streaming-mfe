import { useCallback, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
  themeAlpine,
  colorSchemeDarkBlue,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { colDefs, defaultColDef } from "./columnDef";
import type { RowsMap } from "../types";
import { StyledWrapper } from "./StyledWrapper";

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
  const myTheme2 = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
  });

  return (
    <StyledWrapper>
      <div style={{ height: 900 }}>
        <AgGridReact
          theme={myTheme2}
          rowData={Object.values(rowsMap)}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
        />
      </div>
    </StyledWrapper>
  );
};

export default TradeGrid;
