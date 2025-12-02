import { useCallback, useRef, useState } from "react";
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
import { useLazyGetInstrumentsQuery } from "../../redux/services/instrumentSearchApi";
import { setSelectedInstrument } from "../../redux/services/instrumentSlice";
import { useDispatch } from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);

const InstrumentGrid = () => {
  const dispatch = useDispatch();
  const gridRef = useRef<AgGridReact<Trade>>(null);
  const isInitialLoad = useRef(true);
  const [fetchInstrument] = useLazyGetInstrumentsQuery();
  const [rowData, setRowData] = useState<Trade[]>([]);

  const onTrade = useCallback((trades: Trade[]) => {
    const api = gridRef.current?.api;
    if (!api) return;

    if (isInitialLoad.current) {
      setRowData(trades); // populate initial snapshot
      isInitialLoad.current = false;
    } else {
      api.applyTransactionAsync({ update: trades });
    }
  }, []);
  // Subscribe to WebSocket trade updates
  useTradeStreamRx(onTrade);

  const handleRowDoubleClick = useCallback(
    (row: any) => {
      fetchInstrument({ searchString: row.data.ticker })
        .unwrap()
        .then((result) => {
          if (result.length > 0) {
            dispatch(setSelectedInstrument(result[0]));
          }
        });
    },
    [dispatch, fetchInstrument]
  );

  const getRowId = useCallback<GetRowIdFunc>(
    ({ data: { ticker } }: GetRowIdParams<Trade>) => ticker,
    []
  );

  const myTheme2 = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
    backgroundColor: "#172034",
  });

  return (
    <StyledWrapper>
      <AgGridReact<Trade>
        ref={gridRef}
        theme={myTheme2}
        getRowId={getRowId}
        rowData={rowData} // start empty
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowHeight={30}
        headerHeight={32}
        onRowDoubleClicked={handleRowDoubleClick}
      />
    </StyledWrapper>
  );
};

export default React.memo(InstrumentGrid);
