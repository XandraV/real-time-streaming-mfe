import type { CustomCellRendererProps } from "ag-grid-react";
import GOOGL from "../../assets/GOOGL.png";
import AAPL from "../../assets/AAPL.png";
import MSFT from "../../assets/MSFT.png";
import AMZN from "../../assets/AMZN.png";
import US10Y from "../../assets/US10Y.png";
import CAD30Y from "../../assets/CAD30Y.png";
import MUB from "../../assets/MUB.png";
import FRN2027 from "../../assets/FRN2027.png";
import AIG from "../../assets/AIG.png";
import DAL from "../../assets/DAL.png";
import MA from "../../assets/MA.png";
import EUBOND from "../../assets/EUBOND.png";
import CORPBOND from "../../assets/CORPBOND.png";
import JNJ from "../../assets/JNJ.png";
import PEP from "../../assets/PEP.png";
import UBER from "../../assets/UBER.png";
import MRNA from "../../assets/MRNA.png";
import GER30Y from "../../assets/GER30Y.png";
import TLH from "../../assets/TLH.png";
import TSLA from "../../assets/TSLA.png";
import TLT from "../../assets/TLT.png";
import QCOM from "../../assets/QCOM.png";
import PCG from "../../assets/PCG.png";
import ORCL from "../../assets/ORCL.png";
import NFLX from "../../assets/NFLX.png";
import CSCO35 from "../../assets/CSCO35.png";
import INTC from "../../assets/INTC.png";
import SONY from "../../assets/SONY.png";
import GOVT from "../../assets/GOVT.png";
import TSLABOND from "../../assets/TSLABOND.png";
import IEF from "../../assets/IEF.png";
import SHOP from "../../assets/SHOP.png";
import SLV from "../../assets/SLV.png";
import MCD from "../../assets/MCD.png";
import PYPL from "../../assets/PYPL.png";
import JPM30 from "../../assets/JPM30.png";
import SQ from "../../assets/SQ.png";
import NGG from "../../assets/NGG.png";
import CVS from "../../assets/CVS.png";
import TIP from "../../assets/TIP.png";
import NYCMUNI from "../../assets/NYCMUNI.png";
import VZ25B from "../../assets/VZ25B.png";
import CABOND from "../../assets/CABOND.png";
import ZM from "../../assets/ZM.png";
import BLK from "../../assets/BLK.png";
import NKE from "../../assets/NKE.png";
import ADBE from "../../assets/ADBE.png";
import C from "../../assets/C.png";
import FDX from "../../assets/FDX.png";
import LYFT from "../../assets/LYFT.png";
import JP10Y from "../../assets/JP10Y.png";
import GS10Y from "../../assets/GS10Y.png";
import IWM from "../../assets/IWM.png";
import HSBC from "../../assets/HSBC.png";
import USB30Y from "../../assets/USB30Y.png";
import IBM from "../../assets/IBM.png";
import EONGY from "../../assets/EONGY.png";
import TWTR from "../../assets/TWTR.png";
import HON from "../../assets/HON.png";
import USB2025 from "../../assets/USB2025.png";

const images: Record<string, string> = {
  GOOGL,
  AAPL,
  MSFT,
  AMZN,
  US10Y,
  CAD30Y,
  MUB,
  FRN2027,
  AIG,
  DAL,
  MA,
  EUBOND,
  CORPBOND,
  JNJ,
  PEP,
  UBER,
  MRNA,
  GER30Y,
  TLH,
  TSLA,
  TLT,
  QCOM,
  PCG,
  ORCL,
  NFLX,
  CSCO35,
  INTC,
  SONY,
  GOVT,
  TSLABOND,
  IEF,
  SHOP,
  SLV,
  MCD,
  PYPL,
  JPM30,
  SQ,
  NGG,
  CVS,
  TIP,
  NYCMUNI,
  VZ25B,
  CABOND,
  ZM,
  BLK,
  NKE,
  ADBE,
  C,
  FDX,
  LYFT,
  JP10Y,
  GS10Y,
  IWM,
  HSBC,
  USB30Y,
  IBM,
  EONGY,
  TWTR,
  HON,
  USB2025,
};

export function TradeLogo({ ticker }: { ticker: string }) {
  return (
    <img
      src={images[ticker]}
      alt={ticker}
      width={20}
      height={20}
      style={{ borderRadius: 32 }}
    />
  );
}

export const TickerCellRenderer = ({ data }: CustomCellRendererProps) => {
  return (
    data && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <TradeLogo ticker={data.ticker} />{" "}
        <b className="custom-ticker">{data.ticker}</b>
      </div>
    )
  );
};
