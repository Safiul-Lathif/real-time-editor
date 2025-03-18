import React from "react";
import { ContactMail } from "@mui/icons-material";
import appLogo from "../../assets/app_logo_with_bg.png";
import SettingsIcon from "@mui/icons-material/Settings";
import "./sideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <img
        src={appLogo}
        alt="Research Pick Logo"
        style={{
          width: 250,
          margin: "0 auto",
          marginBottom: "20px",
        }}
      />{" "}
      <nav className="navigation">
        <div
          className={`nav-item ${
            window.location.pathname === "/" ? "active" : ""
          }`}
          onClick={() => (window.location.href = "/")}
        >
          <ContactMail />
          Projects
        </div>
        <div
          className={`nav-item ${
            window.location.pathname === "/credits" ? "active" : ""
          }`}
          onClick={() => (window.location.href = "/credits")}
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
    </aside>
  );
};

export default SideBar;
