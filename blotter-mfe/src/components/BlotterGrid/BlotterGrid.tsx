import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
  themeAlpine,
  colorSchemeDarkBlue,
} from "ag-grid-community";
import { colDefs, defaultColDef } from "./columnDef";
import { StyledWrapper } from "./StyledWrapper";
import type { Trade } from "../../types";
import React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);
type BlotterGridProps = {
  data: any[];
};
const BlotterGrid = ({ data }: BlotterGridProps) => {
  const gridRef = useRef<AgGridReact<Trade>>(null);

  const getRowId = useCallback<GetRowIdFunc>(
    ({ data: { ticker } }: GetRowIdParams<Trade>) => ticker,
    []
  );

  const myTheme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#f3c728d4",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
    backgroundColor: "#172034",
  });

  return (
    <StyledWrapper>
      <div style={{ width: "100%", height: "25vh" }}>
        <AgGridReact<Trade>
          ref={gridRef}
          theme={myTheme}
          getRowId={getRowId}
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowHeight={30}
          headerHeight={32}
        />
      </div>
    </StyledWrapper>
  );
};

export default React.memo(BlotterGrid);
