import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProfileAreaContainer from "./ProfileAreaContainer";
import MainMenu from "./MainMenu";
import HeaderLeft from "./HeaderLeft";

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

const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname.split("/")[1] || "dashboard";

  return (
    <StyledWrapper>
      <HeaderLeft />
      <MainMenu currentPage={currentPage} />
      <ProfileAreaContainer />
    </StyledWrapper>
  );
};

export default Header;
