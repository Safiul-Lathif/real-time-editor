import React, { useState, useEffect } from "react";
import "./ResearchPick.css"; // Import your CSS file
import {
  Add,
  Delete,
  Downloading,
  FileDownload,
  FileDownloadOff,
  Search,
} from "@mui/icons-material";
import SideBar from "../../components/sideBar/SideBar";
import { TopBar } from "../../components/topBar/TopBar";
import axios from "axios";
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
  const [filterBy, setFilterBy] = useState("all_projects");
  const [projects, setProjects] = useState(projectsData); // Initialize projects with data

  let filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  filteredProjects = filteredProjects.filter(
    (project) => project.filterType === filterBy || filterBy === "all"
  );

  const fetchProjects = async (listType) => {
    let token = localStorage.getItem("token");
    try {
      fetch("http://pocapi.researchpick.com/api/projectlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listtype: listType,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProjects(
            data.data.map((project) => {
              return {
                id: 1,
                title: project.title,
                authors: project.authors ?? "",
                owner: project.owner_email,
                lastModified: project.last_edited_on,
                filterType: listType,
                checkbox: false,
              };
            })
          );
        });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(filterBy);
  }, [filterBy]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <SideBar />
      <div className="content">
        <TopBar />
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
                  filterBy === "all_projects" ? "active" : ""
                }`}
                onClick={() => setFilterBy("all_projects")}
              >
                All Projects
              </button>
              <button
                className={`filter-button ${
                  filterBy === "owner" ? "active" : ""
                }`}
                onClick={() => setFilterBy("owner")}
              >
                Your Projects
              </button>
              <button
                className={`filter-button ${
                  filterBy === "collaborator" ? "active" : ""
                }`}
                onClick={() => setFilterBy("collaborator")}
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
          <ul
            style={{
              marginTop: "20px",
              width: "98%",
              borderRadius: "20px",
              backgroundColor: "white",
              padding: "15px",
            }}
          >
            <div className="table-top-bar">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  padding: "3px 10px",
                }}
              >
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
              <button
                className="outlined-button"
                onClick={() => (window.location.href = "/project/new")}
              >
                <Add style={{ marginRight: "5px" }} />
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
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  borderRadius: "10px",
                  padding: "15px 10px",
                  cursor: "pointer",
                  backgroundColor: project.checkbox ? "#e0e0e0" : "white",
                }}
              >
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
                <div
                  onClick={() =>
                    (window.location.href = `/project/${project.id}`)
                  }
                  className="project-list-item-text subtitle"
                >
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
                  <Downloading
                    onClick={async () => {
                      const response = await fetch(
                        `http://pocapi.researchpick.com/api/downloadword?id=${project.id}`
                      );
                      if (response.ok) {
                        const result = await response.text();
                        alert(
                          "File downloaded successfully. Please check the download folder."
                        );
                        window.open(result, "_blank", "noopener,noreferrer");
                      } else {
                        alert("Error downloading file.");
                      }
                    }}
                  />
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
