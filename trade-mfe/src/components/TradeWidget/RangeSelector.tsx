type RangeSelectorProps = {
  range: string;
  setRange: React.Dispatch<React.SetStateAction<string>>;
};

export default function RangeSelector({ range, setRange }: RangeSelectorProps) {
  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "right",
        gap: "4px",
      }}
    >
      {["1M", "3M", "6M", "1Y", "2Y", "5Y", "ALL"].map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          style={{
            padding: "5px",
            background: range === r ? "#5d5dc8" : "rgb(43 43 94)",
            border: "1px solid rgb(69 95 178)",
            borderRadius: "6px",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
