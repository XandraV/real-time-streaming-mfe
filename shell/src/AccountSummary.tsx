import styled from "styled-components";

interface AccountSummaryProps {
  accountId: string;
  currency: string;
  balance: string | number;
  buyingPower: string | number;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  row-gap: 4px;
  column-gap: 24px;
  align-items: center;
  font-family: "Inter", sans-serif;
  color: white;
  padding: 12px 0;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const AccountId = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

const Balance = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: right;

  span.currency {
    font-size: 14px;
    opacity: 0.7;
    margin-right: 4px;
  }
`;

const BuyingPowerWrapper = styled.div`
  text-align: right;
  font-size: 14px;

  .label {
    opacity: 0.6;
    margin-right: 6px;
  }

  .value {
    opacity: 0.85;
  }
`;

export default function AccountSummary({
  accountId,
  currency,
  balance,
  buyingPower,
}: AccountSummaryProps) {
  return (
    <Wrapper>
      <Title>Account</Title>

      <Balance>
        <span className="currency">{currency}</span>
        {balance}
      </Balance>

      <AccountId>{accountId}</AccountId>

      <BuyingPowerWrapper>
        <span className="label">Buying Power</span>
        <span className="value">{buyingPower}</span>
      </BuyingPowerWrapper>
    </Wrapper>
  );
}
