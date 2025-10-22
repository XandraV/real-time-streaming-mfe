import { useCallback, useState } from "react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
  themeAlpine,
  colorSchemeDarkBlue,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { colDefs, defaultColDef } from "./columnDef";
import type { RowsMap } from "../types";
import { StyledWrapper } from "./StyledWrapper";

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

  const myTheme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
  });

  return (
    <StyledWrapper>
      <div style={{ height: 900 }}>
        <AgGridReact
          theme={myTheme}
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
