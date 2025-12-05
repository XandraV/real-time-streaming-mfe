import React from "react";
import BlotterGrid from "./BlotterGrid/BlotterGrid";
import { useGetBlotterDataQuery } from "../redux/services/";
import RefreshButton from "./RefreshButton";
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

const GridControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 4px;
  background: #172034;
  border-bottom: 1px solid #3a4153;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  padding-left: 4px;
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
      <GridControls>
        <Title>Trade Blotter</Title>
        <RefreshButton onClick={onRefresh} />
      </GridControls>

      <BlotterGrid data={data ?? []} />
    </Wrapper>
  );
};

export default React.memo(BlotterWidget);
