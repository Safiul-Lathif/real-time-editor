import React from "react";
import styled from "styled-components";
import appLogo from "../../assets/app_logo_with_bg.png";
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/profile-bg.png"
import logout from "../../assets/logout.png";
import divider from "../../assets/divider.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 160,
      display: 'flex',
      justifyContent: 'space-between',
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderBottom: '2px solid #fff',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 100,
      boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.15)',
    }}>
      <img
        src={appLogo}
        alt="Research Pick Logo"
        style={{
          width: 240,
          height: 70,
          paddingTop: "30px",
        }}
      />
      <RightContent>
        <ProjectDropdown
          onClick={() => {
            navigate("/");
          }}
        >
          Project
        </ProjectDropdown>
        <LogoutButton
          onClick={() => {
            localStorage.clear();
            navigate("/logout");
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}>
            <img
              src={logout}
              alt="logout"
            />
            Logout

          </div>
        </LogoutButton>
      </RightContent>
    </div >
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
  background-image: url(${bgImage});
`;

const RightContent = styled.div`
  display: flex;
  height: 40px;
  padding: 30px;
  padding-top: 40px;
`;

const ProjectDropdown = styled.button`
  /* Style as a dropdown */
  color: white;
  background-color: transparent;
  padding: 10px 50px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  /* Style as a dropdown */
  color: #fec000;
  background-color: transparent;
  padding: 10px 30px;
  border: 1px solid transparent;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s ease;
  font-size: 15px;
`;

const ContentContainer = styled.div`
  padding: 20px;
  max-width: 960px; /* Example */
  margin: 0 auto;
  flex: 1; /* Makes the content expand to fill available space */
`;
