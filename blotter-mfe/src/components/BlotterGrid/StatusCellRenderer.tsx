import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import type { ICellRendererParams } from "ag-grid-community";

interface StatusCellRendererProps extends ICellRendererParams {
  value: string;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
  let color = "#FFC107"; 
  if (value === "Booked") color = "#4CAF50"; 

  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 20 }}
    >
      <CircleIcon style={{ color, fontSize: 12 }} />
      <span>{value}</span>
    </div>
  );
};

export default StatusCellRenderer;
