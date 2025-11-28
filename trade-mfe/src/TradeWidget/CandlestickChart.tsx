import { useEffect, useRef, useState } from "react";
import {
  createChart,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  CandlestickSeries,
  ColorType,
  CrosshairMode,
} from "lightweight-charts";

type CandleChartProps = {
  data?: CandlestickData[];
  height?: number;
};
type Candle = {
  time: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
};

export function generateDailyCandles(year: number): Candle[] {
  const candles: Candle[] = [];

  // Start with a random base price
  let currentPrice = 100 + Math.random() * 20;

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const open = currentPrice;

      // Random small percentage movement (±3%)
      const change = open * (Math.random() * 0.06 - 0.03);

      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 2;
      const low = Math.min(open, close) - Math.random() * 2;

      currentPrice = close; // next day starts from previous close

      candles.push({
        time: dateStr,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
      });
    }
  }

  return candles;
}

export default function CandlestickChart({
  data,
  height = 500,
}: CandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [range, setRange] = useState("ALL"); // 🆕 range state

  // -------- CREATE CHART --------
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        attributionLogo: false,
        textColor: "#ffffffff",
        background: { type: ColorType.Solid, color: "#172034" },
      },
      grid: {
        vertLines: { color: "#334158" },
        horzLines: { color: "#334158" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        borderColor: "#485c7b",
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.applyOptions({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderUpColor: "#4bffb5",
      borderDownColor: "#ff4976",
      wickUpColor: "#4bffb5",
      wickDownColor: "#ff4976",
    });

    const data1 = generateDailyCandles(2020);
    const data2 = generateDailyCandles(2021);
    const data3 = generateDailyCandles(2022);
    const data4 = generateDailyCandles(2023);
    const data5 = generateDailyCandles(2024);
    const data6 = generateDailyCandles(2025);
    candleSeries.setData([
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      ...data5,
      ...data6,
    ]);

    candleSeriesRef.current = candleSeries;

    chart.subscribeCrosshairMove((param) => {
      const tooltip = tooltipRef.current;
      if (!tooltip) return;

      if (
        !param.point ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current!.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current!.clientHeight
      ) {
        tooltip.style.display = "none";
        return;
      }

      const candle = param.seriesData.get(candleSeries);
      if (!candle) {
        tooltip.style.display = "none";
        return;
      }

      const toolTipWidth = 140;
      const toolTipHeight = 100;
      const toolTipMargin = 15;

      tooltip.style.display = "block";
      tooltip.style.position = "absolute";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "1000";
      tooltip.style.width = `${toolTipWidth}px`;
      tooltip.style.height = `${toolTipHeight}px`;
      tooltip.style.padding = "8px";
      tooltip.style.fontFamily =
        "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";

      tooltip.innerHTML = `
  <div style="
    background: #1e1e1e;
    padding: 12px 16px;
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    border: 1px solid #909090ff;
    border-radius: 4px;
  ">
    <div style="display: flex; justify-content: space-between;">
      <span>Open:</span>
      <span style="color: #4bd0e2ff;">$${candle.open.toLocaleString()}</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
      <span>High:</span>
      <span style="color: #4bd0e2ff;">$${candle.high.toLocaleString()}</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
      <span>Low:</span>
      <span style="color: #4bd0e2ff;">$${candle.low.toLocaleString()}</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 4px;">
      <span>Close:</span>
      <span style="color: #4bd0e2ff;">$${candle.close.toLocaleString()}</span>
    </div>
  </div>
`;

      // Proper position
      let left = param.point.x + toolTipMargin;
      if (left + toolTipWidth > chartContainerRef.current!.clientWidth) {
        left = param.point.x - toolTipWidth - toolTipMargin;
      }

      let top = param.point.y + toolTipMargin;
      if (top + toolTipHeight > chartContainerRef.current!.clientHeight) {
        top = param.point.y - toolTipHeight - toolTipMargin;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // -------- UPDATE DATA --------
  useEffect(() => {
    if (candleSeriesRef.current && data) {
      candleSeriesRef.current.setData(data);
    }
  }, [data]);

  // -------- RANGE SELECTOR --------
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

    const seriesData = candleSeriesRef.current?.data();
    if (!seriesData.length) return;

    if (range === "ALL") {
      chartRef.current.timeScale().fitContent();
      return;
    }

    const daysMap: Record<string, number> = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "2Y": 730,
      "5Y": 1825,
    };

    const days = daysMap[range];
    const lastIndex = seriesData.length - 1;
    const lastTime = seriesData[lastIndex].time as string;

    const end = new Date(lastTime);
    const start = new Date(end);
    start.setDate(end.getDate() - days);

    chartRef.current.timeScale().setVisibleRange({
      from: Math.floor(start.getTime() / 1000),
      to: Math.floor(end.getTime() / 1000),
    });
  }, [range]);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {/* CHART */}
      <div
        ref={chartContainerRef}
        style={{
          height,
          width: "100%",
          position: "relative",
          flex: 1,
        }}
      >
        <div ref={tooltipRef} />
      </div>

      {/* RANGE SELECTOR */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {["1M", "3M", "6M", "1Y", "2Y", "5Y", "ALL"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              padding: "4px",
              background: range === r ? "#4bd0e2" : "#1e2a3f",
              border: "1px solid #4bd0e2",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
