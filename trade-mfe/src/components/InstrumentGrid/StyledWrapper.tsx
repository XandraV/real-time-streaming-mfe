import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 100%;
  height: 51vh;
  .ag-row {
    --ag-row-hover-color: #323a46;
  }

  .ag-value-change-value,
  .ag-value-change-value-highlight {
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 12px;
    margin-left: 4px;
  }
  .ag-right-aligned-cell {
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  }

  .ticker-name {
    opacity: 0.8;
  }
`;
