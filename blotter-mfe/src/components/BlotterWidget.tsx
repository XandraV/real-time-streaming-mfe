import React from "react";
import BlotterGrid from "./BlotterGrid/BlotterGrid";
import { useGetBlotterDataQuery } from "../redux/services/blotterDataApi";
import SyncIcon from "@mui/icons-material/Sync";
import styled from "styled-components";

const Wrapper = styled.div`
  font-family: poppins, sans-serif;
  width: 100%;
  background: #172034;
  border-radius: 4px;
  border: 1px solid #3a4153;
  color: white;
  overflow: hidden;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #172034;
  border-bottom: 1px solid #3a4153;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #172034;
  border: 1px solid #3a4153;
  color: #9ba1ac;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const BlotterWidget = () => {
  const { data, refetch } = useGetBlotterDataQuery({
    searchString: "1234",
  });

  const onRefresh = () => {
    refetch();
  };

  return (
    <Wrapper>
      <Controls>
        <Title>Trade Blotter</Title>

        <RefreshButton onClick={onRefresh}>
          Refresh <SyncIcon sx={{ fontSize: 20, color: "#9ba1ac" }} />
        </RefreshButton>
      </Controls>

      <BlotterGrid data={data ?? []} />
    </Wrapper>
  );
};

export default React.memo(BlotterWidget);
