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
import { useBlotterColumns } from "./useBlotterColumns";
import { StyledWrapper } from "./StyledWrapper";
import type { Trade } from "../../types";
import React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);
type BlotterGridProps = {
  data: Trade[];
};

const BlotterGrid = ({ data }: BlotterGridProps) => {
  const gridRef = useRef<AgGridReact<Trade>>(null);
  const { colDefs, defaultColDef } = useBlotterColumns();

  const getRowId = useCallback<GetRowIdFunc>(
    ({ data: { ticker } }: GetRowIdParams<Trade>) => ticker,
    []
  );

  const blotterTheme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
    backgroundColor: "#172034",
  });

  return (
    <StyledWrapper>
      <AgGridReact<Trade>
        ref={gridRef}
        theme={blotterTheme}
        getRowId={getRowId}
        rowData={data}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowHeight={30}
        headerHeight={32}
      />
    </StyledWrapper>
  );
};

export default React.memo(BlotterGrid);
