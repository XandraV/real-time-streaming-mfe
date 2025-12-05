import styled from "styled-components";
import type { Instrument } from "../../redux/types";

type InstrumentInfoProps = {
  selectedInstrument: Instrument;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  font-family: "Inter", sans-serif;
  color: white;
`;

const Column = styled.div<{ right?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: ${({ right }) => (right ? "right" : "left")};
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Ticker = styled.span`
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Name = styled.span`
  opacity: 0.65;
  font-size: 12px;
`;

const Price = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const Change = styled.span<{ positive: boolean }>`
  color: ${({ positive }) => (positive ? "#4caf50" : "#e53935")};
  font-size: 14px;
  font-weight: 500;
`;

const Label = styled.span`
  opacity: 0.6;
  margin-right: 6px;
`;

const Size = styled.span`
  opacity: 0.7;
  font-size: 12px;
  margin-left: 4px;
`;

export default function InstrumentInfo({
  selectedInstrument,
}: InstrumentInfoProps) {
  const {
    ticker,
    name,
    exchange,
    price,
    change,
    changePct,
    ask,
    askSize,
    bid,
    bidSize,
  } = selectedInstrument;

  const positive = change >= 0;

  return (
    <Wrapper>
      <Column>
        <Row>
          <Ticker>{ticker}</Ticker>
          <Name>
            {name} &nbsp; {exchange}
          </Name>
        </Row>

        <Row style={{ alignItems: "flex-end" }}>
          <Price>{price}</Price>

          <Row>
            <Change positive={positive}>
              {positive ? "+" : ""}
              {change}
            </Change>

            <Change positive={positive}>
              {positive ? "+" : ""}
              {changePct}%
            </Change>
          </Row>
        </Row>
      </Column>

      <Column right>
        <Row>
          <Label>Ask</Label>
          <span style={{ color: "#e53935" }}>{ask}</span>
          <Size>× {askSize}</Size>
        </Row>

        <Row>
          <Label>Bid</Label>
          <span style={{ color: "#2872ff" }}>{bid}</span>
          <Size>× {bidSize}</Size>
        </Row>
      </Column>
    </Wrapper>
  );
}
