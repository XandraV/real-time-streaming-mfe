import {
  type ColDef,
  type ValueFormatterFunc,
  type ValueGetterParams,
} from "ag-grid-community";
import { TickerCellRenderer } from "./TickerCellRenderer";

const numberFormatter: ValueFormatterFunc = ({ value }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
  });
  return value == null ? "" : formatter.format(value);
};

export const defaultColDef: ColDef = {
  flex: 1,
  filter: true,
};
export const colDefs: Array<ColDef> = [
  {
    field: "ticker",
    cellRenderer: TickerCellRenderer,
    minWidth: 100,
  },
  {
    field: "name",
    minWidth: 300,
  },
  {
    field: "instrument",
    cellDataType: "text",
    type: "rightAligned",
    minWidth: 80,
    initialWidth: 80,
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
    minWidth: 140,
    initialWidth: 140,
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
    minWidth: 160,
    initialWidth: 160,
  },
];
