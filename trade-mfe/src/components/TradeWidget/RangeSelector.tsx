import styled from "styled-components";

type RangeSelectorProps = {
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
};

const Container = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

const RangeButton = styled.button<{ active: boolean }>`
  padding: 5px;
  background: ${(props) => (props.active ? "#66b2ff" : "#111729")};
  border: 1px solid #38406a;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export default function RangeSelector({ range, setRange }: RangeSelectorProps) {
  const ranges = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "ALL"];

  return (
    <Container>
      {ranges.map((r) => (
        <RangeButton
          key={r}
          active={range === r}
          onClick={() => setRange(r)}
          aria-pressed={range === r}
        >
          {r}
        </RangeButton>
      ))}
    </Container>
  );
}
