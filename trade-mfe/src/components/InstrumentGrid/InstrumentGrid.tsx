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
import useTradeStreamRx from "../../hooks/useTradeStreamRx";
import { colDefs, defaultColDef } from "./columnDef";
import { StyledWrapper } from "./StyledWrapper";
import type { Trade } from "../../types";
import React from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

const InstrumentGrid = () => {
  const gridRef = useRef<AgGridReact<Trade>>(null);
  const isInitialLoad = useRef(true);

  const onTrade = useCallback(
    (trades: Trade) => {
      const api = gridRef.current?.api;
      if (!api) return;

      if (isInitialLoad.current) {
        // first message: full snapshot
        api.applyTransactionAsync({ add: trades });

        isInitialLoad.current = false;
      } else {
        // subsequent messages: only updates
       // console.log("hello update", trades.length);
        api.applyTransactionAsync({ update: trades });
      }
    },
    [gridRef]
  );
  // Subscribe to WebSocket trade updates
  useTradeStreamRx(onTrade);

  const getRowId = useCallback<GetRowIdFunc>(
    ({ data: { ticker } }: GetRowIdParams<Trade>) => ticker,
    []
  );

  const myTheme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
    backgroundColor: "#172034",
  });

  return (
    <StyledWrapper>
      <div style={{ width: "100%", height: "50vh" }}>
        <AgGridReact<Trade>
          ref={gridRef}
          theme={myTheme}
          getRowId={getRowId}
          rowData={[]} // start empty
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowHeight={30}
          headerHeight={32}
        />
      </div>
    </StyledWrapper>
  );
};

export default React.memo(InstrumentGrid);
