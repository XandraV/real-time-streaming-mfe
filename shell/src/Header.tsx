import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import DollarLogo from "./DollarLogo";
import { AccountSelector, type Account } from "./AccountSelector";
import { useState } from "react";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  width: 100%;
  justify-content: center;
  position: relative;
  color: white;
  font-family: poppins, sans-serif;
`;

const StyledMenu = styled.div`
  height: 40px;
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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

type MenuItemProps = {
  isCurrent: boolean;
};

const MenuItem = styled(Link)<MenuItemProps>`
  color: white;
  font-family: poppins, sans-serif;
  width: 140px;
  height: 40px;
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
      height: 20px;
      border-radius: 100px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.16) 0%,
        rgba(255, 255, 255, 0.1) 33%,
        rgba(255, 255, 255, 0.02) 100%
      );
      filter: blur(1px);
      top: 5px;
    }
  }

  span {
    z-index: 2;
  }
`;

const TitleArea = styled.div`
  position: absolute;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 28px;
  letter-spacing: 1.4px;
  left: 10px;
`;

const accounts = [
  {
    name: "Account 1",
    id: "U19873141",
    currency: "GBP",
    balance: "10,494.74",
    buyingPower: "7,534.62",
  },
  {
    name: "Account 2",
    id: "U15331401",
    currency: "GBP",
    balance: "21,494.74",
    buyingPower: "11,712.33",
  },
];
const NavMenu = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1] || "dashboard";
  const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[0]);
  const onSelectAccount = (account: Account) => {
    setSelectedAccount(account);
  };
  return (
    <StyledWrapper>
      <TitleArea>
        <DollarLogo />
        <span>StockLens</span>
      </TitleArea>

      <StyledMenu>
        <MenuItems>
          <MenuItem to="/trade" isCurrent={currentPage === "dashboard"}>
            <div className="glow" />
            <span>Dashboard</span>
          </MenuItem>

          <MenuItem
            to="/trade"
            isCurrent={currentPage === "trade"}
            onClick={(e) => {
              if (location.pathname === "/trade") e.preventDefault();
            }}
          >
            <div className="glow" />
            <span>Trade</span>
          </MenuItem>

          <MenuItem
            to="/trade"
            onClick={(e) => {
              if (location.pathname === "/portfolio") e.preventDefault();
            }}
            isCurrent={currentPage === "portfolio"}
          >
            <div className="glow" />
            <span>Portfolio</span>
          </MenuItem>

          <MenuItem to="/trade" isCurrent={currentPage === "watchlist"}>
            <div className="glow" />
            <span>Watchlist</span>
          </MenuItem>
        </MenuItems>
      </StyledMenu>

      <AccountSelector
        accounts={accounts}
        selectedAccount={selectedAccount}
        onSelect={onSelectAccount}
      />
    </StyledWrapper>
  );
};

export default NavMenu;
