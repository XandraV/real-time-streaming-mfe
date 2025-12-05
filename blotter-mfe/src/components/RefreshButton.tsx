import SyncIcon from "@mui/icons-material/Sync";
import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #172034;
  border: 1px solid #3a4153;
  color: #9ba1ac;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #1f2a40;
    border-color: #4a5568;
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const SpinningIcon = styled(SyncIcon)<{ spinning: boolean }>`
  ${({ spinning }) =>
    spinning &&
    css`
      animation: ${spin} 0.6s linear;
    `}
`;

type ButtonProps = {
  onClick: () => void;
};

const RefreshButton = ({ onClick }: ButtonProps) => {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    onClick();

    // reset after animation finishes
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <StyledButton onClick={handleClick}>
      Refresh
      <SpinningIcon
        sx={{ fontSize: 20, color: "#9ba1ac" }}
        spinning={spinning}
      />
    </StyledButton>
  );
};

export default RefreshButton;
