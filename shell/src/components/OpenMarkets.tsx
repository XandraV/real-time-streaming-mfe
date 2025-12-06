import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: poppins, sans-serif;
  font-size: 12px;
  background-color: #0d3035;
  border-radius: 8px;
  padding: 8px 10px;
  letter-spacing: 0;
`;

const MarketLabel = styled.span`
  opacity: 0.4;
  margin: 0 2px;
`;

const MarketTime = styled.span`
  margin: 0 2px;
`;

const Separator = styled.span`
  margin: 0 8px;
  opacity: 0.4;
`;

const OpenMarkets = () => {
  return (
    <StyledWrapper>
      {/* <MarketLabel style={{ opacity: 1 }}>Markets Open</MarketLabel>
      <Separator>|</Separator> */}

      <MarketLabel>NY:</MarketLabel>
      <MarketTime>14:30:45</MarketTime>
      <Separator>|</Separator>

      <MarketLabel>LND:</MarketLabel>
      <MarketTime>19:30:45</MarketTime>
      <Separator>|</Separator>

      <MarketLabel>TYO:</MarketLabel>
      <MarketTime>03:30:45</MarketTime>
    </StyledWrapper>
  );
};

export default OpenMarkets;
