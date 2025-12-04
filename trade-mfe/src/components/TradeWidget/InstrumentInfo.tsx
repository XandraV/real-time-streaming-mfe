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

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TickerLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Ticker = styled.span`
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Name = styled.span`
  opacity: 0.65;
  font-size: 12px;
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const ChangeRow = styled.div`
  display: flex;
  gap: 10px;
`;

const PriceLine = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const Change = styled.span<{ positive: boolean }>`
  color: ${({ positive }) => (positive ? "#4caf50" : "#e53935")};
  font-size: 14px;
  font-weight: 500;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
  font-size: 14px;

  .label {
    opacity: 0.6;
    margin-right: 6px;
  }

  .ask {
    color: #e53935;
  }

  .bid {
    color: #2872ff;
  }

  .size {
    opacity: 0.7;
    font-size: 12px;
    margin-left: 4px;
  }
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
  const positive = selectedInstrument.change >= 0;

  return (
    <Wrapper>
      <Left>
        <TickerLine>
          <Ticker>{ticker}</Ticker>
          <Name>
            {name} &nbsp; {exchange}
          </Name>
        </TickerLine>
        <PriceLine>
          <Price>{price.toFixed(2)}</Price>

          <ChangeRow>
            <Change positive={positive}>
              {positive ? "+" : ""}
              {change.toFixed(2)}
            </Change>
            <Change positive={positive}>
              {positive ? "+" : ""}
              {changePct.toFixed(2)}%
            </Change>
          </ChangeRow>
        </PriceLine>
      </Left>

      <Right>
        <div>
          <span className="label">Ask</span>
          <span className="ask">{ask.toFixed(2)}</span>
          <span className="size">× {askSize}</span>
        </div>
        <div>
          <span className="label">Bid</span>
          <span className="bid">{bid.toFixed(2)}</span>
          <span className="size">× {bidSize}</span>
        </div>
      </Right>
    </Wrapper>
  );
}
