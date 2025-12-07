import { styled } from "styled-components";
import OpenMarkets from "./OpenMarkets";
import DollarLogo from "./DollarLogo";

const TitleArea = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  letter-spacing: 1.4px;
  left: 0px;
`;

const HeaderLeft = () => (
  <TitleArea>
    <DollarLogo />
    <span style={{ marginRight: 8 }}>StockLens</span>
    <OpenMarkets />
  </TitleArea>
);

export default HeaderLeft;
