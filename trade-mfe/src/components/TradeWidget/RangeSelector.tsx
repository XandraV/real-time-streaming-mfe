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
  background: ${(props) => (props.active ? "#5d5dc8" : "rgb(43 43 94)")};
  border: 1px solid rgb(69 95 178);
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    opacity: 0.8;
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
