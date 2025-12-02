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
    field: "quantity",
    headerName: "Quantity",
    type: "rightAligned",
    cellDataType: "number",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    minWidth: 70,
  },
  {
    field: "price",
    headerName: "Price",
    type: "rightAligned",
    cellDataType: "number",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
    minWidth: 70,
  },
  {
    field: "purchasePrice",
    headerName: "Purchase Price",
    type: "rightAligned",
    cellDataType: "number",
    filter: "agNumberColumnFilter",
    valueFormatter: numberFormatter,
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
  {
    field: "status",
    headerName: "Status",
    cellDataType: "text",
    type: "rightAligned",
    minWidth: 70,
  },
];
