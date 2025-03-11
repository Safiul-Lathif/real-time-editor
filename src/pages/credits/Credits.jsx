"use client";
import React, { useState } from "react";
import appLogo from "../../assets/app_logo.png";
import "./credits.css"; // Import your CSS file
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ContactMail,
  Delete,
  Downloading,
  FileDownload,
  FileDownloadOff,
  NotificationAdd,
  PlusOne,
  Search,
} from "@mui/icons-material";
import SideBar from "../../components/sideBar/SideBar";
import PlanSection from "../../components/cards/planSectionCard";
const projectsData = [
  // Sample project data (replace with your actual data)
  {
    id: 1,
    invoice: "invoice#0021 - jan 2025",
    amount: "$100",
    date: "jan 01, 2025",
    status: "Success",
    action: "download",
    checkbox: false,
  },
  {
    id: 2,
    invoice: "invoice#0021 - jan 2025",
    amount: "$100",
    date: "jan 01, 2025",
    status: "Success",
    action: "download",
    checkbox: false,
  },
  {
    id: 3,
    invoice: "invoice#0021 - jan 2025",
    amount: "$100",
    date: "jan 01, 2025",
    status: "Success",
    action: "download",
    checkbox: false,
  },
];

const Credits = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [projects, setProjects] = useState(projectsData); // Initialize projects with data

  let filteredProjects = projects.filter((project) =>
    project.invoice.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredProjects = filteredProjects.filter(
    (project) => project.filterType === filterBy || filterBy === "all"
  );

  return (
    <div className="container">
      <SideBar />
      <div className="content">
        <header className="header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img
              src="https://media.licdn.com/dms/image/v2/C4D03AQFdX9FHzdCSYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646324063549?e=1744243200&v=beta&t=0fWXGZOdxmZ8Xh255N5WSQB6jrfjGpS4i0dpX2sn2lE"
              alt="User Avatar"
              className="avatar"
            />
            <span className="user-name">Safiul Lathif</span>
          </div>
          <div
            style={{
              height: "45px",
              width: "45px",
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotificationAdd />
          </div>
        </header>

        <div className="project-area">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          ></div>
          <PlanSection />
          <p
            style={{
              textAlign: "start",
              fontSize: "15px",
              paddingLeft: "10px",
              fontWeight: "bold",
              color: "#41075c",
            }}
          >
            Your Purchases
          </p>
          <ul className="project-list">
            <li className="project-list-header">
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setProjects((prevProjects) =>
                    prevProjects.map((project) => ({
                      ...project,
                      checkbox: isChecked,
                    }))
                  );
                }}
              />
              <div className="project-list-header-item subtitle">Invoice</div>
              <div className="project-list-header-item">Amount</div>
              <div className="project-list-header-item">Date</div>
              <div className="project-list-header-item">Status</div>
              <div className="project-list-header-item">Actions</div>
            </li>
            {filteredProjects.map((project, index) => (
              <li key={index} className="project-list-item">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={project.checkbox}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setProjects((prevProjects) =>
                      prevProjects.map((p) =>
                        p.id === project.id ? { ...p, checkbox: isChecked } : p
                      )
                    );
                  }}
                />
                <div className="project-list-item-text subtitle">
                  {project.invoice}
                </div>
                <div className="project-list-item-text">{project.amount}</div>
                <div className="project-list-item-text">{project.date}</div>
                <div className="project-list-item-text">{project.status}</div>
                <div className="project-list-item-text">{project.action}</div>
              </li>
            ))}
          </ul>
        </div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "400",
            color: "gray",
            marginTop: "10px",
            alignItems: "center",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Showing {filteredProjects.length} out of {projects.length} projects
        </span>
      </div>
    </div>
  );
};

export default Credits;
