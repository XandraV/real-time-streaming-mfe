import { Link } from "react-router-dom";
import { styled } from "styled-components";

type MainMenuProps = {
  currentPage: string;
};

type MenuItemProps = {
  isCurrent: boolean;
};

const StyledMenu = styled.div`
  height: 35px;
  background-color: #38406a;
  border-radius: 100px;
  padding: 2px;
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

const MenuItems = styled.div`
  background: #141d2c;
  border-radius: 100px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const MenuItem = styled(Link)<MenuItemProps>`
  color: white;
  font-family: poppins, sans-serif;
  width: 120px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  text-decoration: none;
  position: relative;

  ${({ isCurrent }) =>
    isCurrent &&
    "background: linear-gradient(180deg, #2a2a59 0%, #2c2c65 100%);box-shadow: inset 0 0 8px #4a4a9e;color: white;"}

  &:hover {
    background: linear-gradient(180deg, #2a2a59 0%, #2c2c65 100%);
    box-shadow: inset 0 0 8px #4a4a9e;
    color: white;
    div.glow {
      position: absolute;
      width: 120px;
      height: 18px;
      border-radius: 100px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.1) 33%,
        rgba(255, 255, 255, 0.02) 100%
      );
      filter: blur(1px);
      top: 3px;
    }
  }

  span {
    z-index: 2;
  }
`;

const MainMenu = ({ currentPage }: MainMenuProps) => (
  <StyledMenu>
    <MenuItems>
      <MenuItem to="/dashboard" isCurrent={currentPage === "dashboard"}>
        <div className="glow" />
        <span>Dashboard</span>
      </MenuItem>
      <MenuItem to="/trade" isCurrent={currentPage === "trade"}>
        <div className="glow" />
        <span>Trade</span>
      </MenuItem>
      <MenuItem to="/portfolio" isCurrent={currentPage === "portfolio"}>
        <div className="glow" />
        <span>Portfolio</span>
      </MenuItem>
      <MenuItem to="/watchlist" isCurrent={currentPage === "watchlist"}>
        <div className="glow" />
        <span>Watchlist</span>
      </MenuItem>
    </MenuItems>
  </StyledMenu>
);

export default MainMenu;
