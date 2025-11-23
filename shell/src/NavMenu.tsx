import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  height: 50px;
  margin: 30px auto 30px auto;
  width: 604px;
  background-color: #38406a;
  border-radius: 100px;
  padding: 2px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  font-family: poppins, sans-serif;
  font-size: 14px;
  color: white;
  img {
    transform: rotate(-18deg);
  }
`;

const StyledMenuItemContainer = styled.div`
  background: #141d2c;
  background-image: none;
  border-radius: 100px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  width: 660px;
`;

type MenuItemProps = {
  isCurrent: boolean;
};

const StyledMenuItem = styled(Link)<MenuItemProps>`
  color: white;
  font-family: poppins, sans-serif;
  width: 150px;
  align-self: center;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 100px;
  text-decoration: none;
  ${({ isCurrent }) => isCurrent && "background: #38406a;"}
  &:hover {
    background: linear-gradient(180deg, #2a2a59ff 0%, #2c2c65ff 100%);
    box-shadow: 0px 0px 7px 0px #414158 inset;

    div {
      width: 121px;
      height: 22px;
      position: absolute;
      border-radius: 100px;
      background: linear-gradient(
        180deg,
        rgba(251, 254, 255, 0.16) 0%,
        rgba(251, 254, 255, 0.1) 33.85%,
        rgba(250, 253, 255, 0.01) 100%
      );
      filter: blur(1px);
    }
  }
  span {
    margin: auto;
  }
`;

const NavMenu = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1] || "dashboard";

  return (
    <StyledMenu id="menu">
      <StyledMenuItemContainer>
        <StyledMenuItem
          to={`/dashboard`}
          isCurrent={currentPage === "dashboard"}
        >
          <div />
          <span>Dashboard</span>
        </StyledMenuItem>

        <StyledMenuItem to={`/trade`} isCurrent={currentPage === "trade"}>
          <div />
          <span>Trade</span>
        </StyledMenuItem>

        <StyledMenuItem
          to={`/portfolio`}
          isCurrent={currentPage === "portfolio"}
        >
          <div />
          <span>Portfolio</span>
        </StyledMenuItem>
        <StyledMenuItem
          to={`/watchlist`}
          isCurrent={currentPage === "watchlist"}
        >
          <div />
          <span>Watchlist</span>
        </StyledMenuItem>
      </StyledMenuItemContainer>
    </StyledMenu>
  );
};

export default NavMenu;
