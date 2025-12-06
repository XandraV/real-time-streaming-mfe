import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  type GetRowIdFunc,
  type GetRowIdParams,
  themeAlpine,
  colorSchemeDarkBlue,
  type RowDoubleClickedEvent,
} from "ag-grid-community";
import { useTradeStreamRx } from "../../hooks";
import { useInstrumentColumns } from "./useInstrumentColumns";
import { StyledWrapper } from "./StyledWrapper";
import type { Instrument } from "../../types";
import React from "react";
import {
  setSelectedInstrument,
  useLazyGetInstrumentsQuery,
} from "../../redux/services";
import { useDispatch } from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);

const InstrumentGrid = () => {
  const dispatch = useDispatch();
  const gridRef = useRef<AgGridReact<Instrument>>(null);
  const { colDefs, defaultColDef } = useInstrumentColumns();
  const isInitialLoad = useRef(true);
  const [fetchInstrument] = useLazyGetInstrumentsQuery();
  const [rowData, setRowData] = useState<Instrument[]>([]);

  const onTrade = useCallback((trades: Instrument[]) => {
    const api = gridRef.current?.api;
    if (!api) return;

    if (isInitialLoad.current) {
      setRowData(trades);
      isInitialLoad.current = false;
    } else {
      api.applyTransactionAsync({ update: trades });
    }
  }, []);
  // Subscribe to WebSocket trade updates
  useTradeStreamRx(onTrade);

  const handleRowDoubleClick = useCallback(
    (event: RowDoubleClickedEvent<Instrument>) => {
      const ticker = event.data?.ticker;
      if (!ticker) return;

      fetchInstrument({ searchString: ticker })
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
    ({ data: { ticker } }: GetRowIdParams<Instrument>) => ticker,
    []
  );

  const instrumentTheme = themeAlpine.withPart(colorSchemeDarkBlue).withParams({
    valueChangeValueHighlightBackgroundColor: "#823fcaa0",
    valueChangeDeltaDownColor: "rgb(255, 0, 92)",
    valueChangeDeltaUpColor: "rgb(53, 182, 90)",
    backgroundColor: "#172034",
  });

  return (
    <StyledWrapper>
      <AgGridReact<Instrument>
        ref={gridRef}
        theme={instrumentTheme}
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
