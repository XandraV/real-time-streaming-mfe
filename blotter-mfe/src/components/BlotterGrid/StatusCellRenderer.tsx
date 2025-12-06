import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "styled-components";
import type { ICellRendererParams } from "ag-grid-community";

interface StatusCellRendererProps extends ICellRendererParams {
  value: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 20px;
`;

const StatusCellRenderer: React.FC<StatusCellRendererProps> = ({ value }) => {
  const color = value === "Booked" ? "#4CAF50" : "#FFC107";

  return (
    <Container>
      <CircleIcon style={{ color, fontSize: 12 }} />
      <span>{value}</span>
    </Container>
  );
};

export default StatusCellRenderer;
