"use client";
import React, { useState } from "react";
import appLogo from "../../assets/app_logo.png";
import "./ResearchPick.css"; // Import your CSS file

import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
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
const projectsData = [
  // Sample project data (replace with your actual data)
  {
    id: 1,
    title: "Types of stem cells and their usage",
    authors: "You",
    owner: "You",
    lastModified: "20 minutes ago",
    filterType: "your",
    checkbox: false,
  },
  {
    id: 2,
    title: "The healthiest diet does not exist",
    authors: "You",
    owner: "You",
    lastModified: "a day ago",
    filterType: "your",
    checkbox: false,
  },
  {
    id: 3,
    title: "Low carbohydrate vs, low-fat diets",
    authors: "Prakash",
    owner: "Prakash",
    lastModified: "60 minutes ago",
    filterType: "collaborations",
    checkbox: false,
  },
  {
    id: 4,
    title: "How are black holes created?",
    authors: "Vignesh",
    owner: "Vignesh",
    lastModified: "40 minutes ago",
    filterType: "archived",
    checkbox: false,
  },
  {
    id: 5,
    title: "What Causes Eating Disorders?",
    authors: "You",
    owner: "You",
    lastModified: "1 hour ago",
    filterType: "trashed",
    checkbox: false,
  },
  {
    id: 6,
    title: "Types of stem cells and their usage",
    authors: "You",
    owner: "You",
    lastModified: "20 minutes ago",
    filterType: "your",
    checkbox: false,
  },
  {
    id: 7,
    title: "Types of stem cells and their usage",
    authors: "You",
    owner: "You",
    lastModified: "20 minutes ago",
    filterType: "collaborations",
    checkbox: false,
  },
  {
    id: 8,
    title: "Types of stem cells and their usage",
    authors: "You",
    owner: "You",
    lastModified: "20 minutes ago",
    filterType: "archived",
    checkbox: false,
  },
];

const ResearchPick = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [projects, setProjects] = useState(projectsData); // Initialize projects with data

  let filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredProjects = filteredProjects.filter(
    (project) => project.filterType === filterBy || filterBy === "all"
  );

  return (
    <div className="container">
      <aside className="sidebar">
        <img
          src={appLogo}
          alt="Research Pick Logo"
          style={{
            width: 240,
            height: 100,
            margin: "0 auto",
            marginBottom: "20px",
          }}
        />{" "}
        <nav className="navigation">
          <div className="nav-item active">
            <ContactMail />
            Projects
          </div>
          <div className="nav-item">
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
          >
            <div className="project-filters">
              <button
                className={`filter-button ${
                  filterBy === "all" ? "active" : ""
                }`}
                onClick={() => setFilterBy("all")}
              >
                All Projects
              </button>
              <button
                className={`filter-button ${
                  filterBy === "your" ? "active" : ""
                }`}
                onClick={() => setFilterBy("your")}
              >
                Your Projects
              </button>
              <button
                className={`filter-button ${
                  filterBy === "collaborations" ? "active" : ""
                }`}
                onClick={() => setFilterBy("collaborations")}
              >
                Your Collaborations
              </button>
              <button
                className={`filter-button ${
                  filterBy === "archived" ? "active" : ""
                }`}
                onClick={() => setFilterBy("archived")}
              >
                Archived Projects
              </button>
              <button
                className={`filter-button ${
                  filterBy === "trashed" ? "active" : ""
                }`}
                onClick={() => setFilterBy("trashed")}
              >
                Trashed Projects
              </button>
            </div>
            <div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  marginRight: "20px",
                }}
              >
                You are on the free plan
              </span>
              <button className="upgrade-button">Upgrade</button>
            </div>
          </div>
          <ul className="project-list">
            <div className="table-top-bar">
              <div className="search-box-container">
                <Search
                  style={{
                    color: "gray",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search in all projects..."
                  className="search-box"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="outlined-button">
                <PlusOne style={{ marginRight: "5px" }} />
                New project
              </button>
            </div>
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
              <div className="project-list-header-item subtitle">Title</div>
              <div className="project-list-header-item">Authors</div>
              <div className="project-list-header-item">Owner</div>
              <div className="project-list-header-item">Last Modified</div>
              <div className="project-list-header-item action">Actions</div>
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
                  {project.title}
                </div>
                <div className="project-list-item-text">---</div>
                <div className="project-list-item-text">{project.owner}</div>
                <div className="project-list-item-text">
                  {project.lastModified}
                </div>
                <div className="project-list-item-text action">
                  <FileDownload />
                  <FileDownloadOff />
                  <Downloading />
                  <Delete />
                </div>
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

export default ResearchPick;
