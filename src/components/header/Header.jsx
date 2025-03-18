import React from "react";
import styled from "styled-components";
import appLogo from "../../assets/app_logo_with_bg.png";
const Header = () => {
  return (
    <HeaderContainer>
      <img
        src={appLogo}
        alt="Research Pick Logo"
        style={{
          width: 240,
          height: 70,
        }}
      />
      <RightContent>
        <ProjectDropdown
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Project
        </ProjectDropdown>
        <LogoutButton
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </LogoutButton>
      </RightContent>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(91, 3, 91);
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 20px 20px 0px 0px;
`;

const RightContent = styled.div`
  display: flex;
  gap: 10px;
  height: 40px;
`;

const ProjectDropdown = styled.button`
  /* Style as a dropdown */
  color: white;
  background-color: rgb(91, 3, 91);
  padding: 10px 30px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  /* Style as a dropdown */
  color: white;
  background-color: rgb(91, 3, 91);
  padding: 10px 30px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  padding: 20px;
  max-width: 960px; /* Example */
  margin: 0 auto;
  flex: 1; /* Makes the content expand to fill available space */
`;
