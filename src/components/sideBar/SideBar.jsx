import React from "react";
import { ContactMail } from "@mui/icons-material";
import appLogo from "../../assets/app_logo_with_bg.png";
import SettingsIcon from "@mui/icons-material/Settings";
import "./sideBar.css";
import { useNavigate } from 'react-router-dom';
import divider from "../../assets/divider.png";
import styled from "styled-components";
import logout from "../../assets/logout.png"

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <img
        src={appLogo}
        alt="Research Pick Logo"
        style={{
          width: 230,
          margin: "0 auto",
          marginBottom: "20px",
        }}
      />{" "}
      <nav className="navigation">
        <div
          className={`nav-item ${window.location.pathname === "/" ? "active" : ""
            }`}
          onClick={() => (navigate("/"))}
        >
          <ContactMail />
          Projects
        </div>
        <div
          className={`nav-item ${window.location.pathname === "/credits" ? "active" : ""
            }`}
          onClick={() => (navigate("/credits"))}
        >
          <ContactMail />
          Credits
        </div>
        <div className="nav-item">
          <ContactMail />
          Contacts
        </div>
        <div className="nav-item">
          <SettingsIcon />
          Settings
        </div>
        <div className="nav-item">
          <ContactMail />
          Journal List
        </div>
      </nav>
      <footer className="footer">
        <div className="divider">
          <img src={divider} alt="Divider" />
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
        </div>
      </footer>
    </aside>
  );
};

export default SideBar;

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