import { useEffect, useRef } from "react";
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

export default function CandlestickChart({
  data,
  height = 500,
}: CandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        attributionLogo: false,
        textColor: "#ffffffff",
        background: { type: ColorType.Solid, color: "#141d2c" },
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: "#485c7b",
        barSpacing: 1000,
        fixLeftEdge: true,
        fixRightEdge: true,
        tickMarkFormatter: (time: string) => {
          const [year, month, day] = time.split("-").map(Number);

          return `${month}/${year}`; // skip other ticks
        },
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

    candleSeries.setData([
      { time: "2023-01-01", open: 100, high: 105, low: 98, close: 102 },
      { time: "2023-02-01", open: 102, high: 108, low: 101, close: 107 },
      { time: "2023-03-01", open: 107, high: 110, low: 105, close: 108 },
      { time: "2023-04-01", open: 108, high: 112, low: 107, close: 111 },
      { time: "2023-05-01", open: 111, high: 113, low: 109, close: 110 },
      { time: "2023-06-01", open: 110, high: 115, low: 108, close: 114 },
      { time: "2023-07-01", open: 114, high: 116, low: 112, close: 113 },
      { time: "2023-08-01", open: 117, high: 120, low: 115, close: 118 },
      { time: "2023-09-01", open: 119, high: 123, low: 118, close: 122 },
      { time: "2023-10-01", open: 124, high: 126, low: 122, close: 125 },
      { time: "2023-11-01", open: 125, high: 128, low: 123, close: 127 },
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

  useEffect(() => {
    if (candleSeriesRef.current && data) {
      candleSeriesRef.current.setData(data);
      //   chartRef.current?.timeScale().fitContent();
    }
  }, [data]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "550px",
        background: "#1f2836",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "95%",
          height: "530px",
          background: "#141d2c",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "4px",
        }}
      >
        {/* <div style={{ color: "white" }}>HELLLOOO</div> */}
        <div
          ref={chartContainerRef}
          style={{
            height,
            width: "100%",
            boxSizing: "border-box",
            position: "relative",
            flex: 1,
          }}
        >
          <div ref={tooltipRef} />
        </div>
      </div>
    </div>
  );
}
