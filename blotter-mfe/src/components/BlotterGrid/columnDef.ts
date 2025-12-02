import {
  type ColDef,
  type ValueFormatterFunc,
  type ValueGetterParams,
} from "ag-grid-community";
import { TickerCellRenderer } from "./TickerCellRenderer";
import StatusCellRenderer from "./StatusCellRenderer";

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
    width: 120,
    maxWidth: 120,
  },
  {
    field: "name",
    resizable: true,
    width: 220,
    maxWidth: 220,
  },
  {
    field: "instrument",
    cellDataType: "text",
    type: "rightAligned",
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
    minWidth: 100,
  },
  {
    colId: "totalValue",
    headerName: "Total Value",
    type: "rightAligned",
    cellDataType: "number",
    filter: "agNumberColumnFilter",
    valueGetter: ({ data }: ValueGetterParams) =>
      data && data.quantity * data.price,
    valueFormatter: numberFormatter,
    width: 120,
    maxWidth: 120,
  },
  {
    field: "status",
    headerName: "Status",
    cellDataType: "text",
    cellRenderer: StatusCellRenderer,
    width: 120,
    maxWidth: 120,
  },
  {
    field: "timestamp",
    headerName: "Time",
    cellDataType: "text",
    type: "rightAligned",
    minWidth: 70,
    valueFormatter: ({ value }) => {
      if (!value) return "";
      const date = new Date(value);
      const pad = (n: number) => n.toString().padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // months are 0-based
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
];
