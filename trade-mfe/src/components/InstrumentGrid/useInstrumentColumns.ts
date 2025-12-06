import { useMemo } from "react";
import {
  type ColDef,
  type ValueFormatterFunc,
  type ValueGetterParams,
} from "ag-grid-community";
import { TickerCellRenderer } from "./TickerCellRenderer";

export const useInstrumentColumns = () => {
  const numberFormatter: ValueFormatterFunc = useMemo(
    () => ({ value }) => {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 2,
      });
      return value == null ? "" : formatter.format(value);
    },
    []
  );

  const defaultColDef: ColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
    }),
    []
  );

  const colDefs: ColDef[] = useMemo(
    () => [
      {
        field: "ticker",
        cellRenderer: TickerCellRenderer,
        minWidth: 140,
      },
      {
        field: "name",
        minWidth: 50,
        resizable: true,
      },
      {
        field: "instrument",
        cellDataType: "text",
        type: "rightAligned",
        minWidth: 70,
      },
      {
        colId: "p&l",
        headerName: "P&L",
        cellDataType: "number",
        filter: "agNumberColumnFilter",
        type: "rightAligned",
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueGetter: ({ data }: ValueGetterParams) =>
          data && data.quantity * (data.price / data.purchasePrice),
        valueFormatter: numberFormatter,
        minWidth: 200,
      },
      {
        colId: "totalValue",
        headerName: "Total Value",
        type: "rightAligned",
        cellDataType: "number",
        filter: "agNumberColumnFilter",
        valueGetter: ({ data }: ValueGetterParams) =>
          data && data.quantity * data.price,
        cellRenderer: "agAnimateShowChangeCellRenderer",
        valueFormatter: numberFormatter,
        minWidth: 210,
      },
    ],
    [numberFormatter]
  );

  return { colDefs, defaultColDef };
};
