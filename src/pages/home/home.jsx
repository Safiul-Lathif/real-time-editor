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
import { useNavigate } from 'react-router-dom';


const ResearchPick = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all_projects");
  const [projects, setProjects] = useState([]); // Initialize projects with data

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
          if (!data.data) {
            setProjects([]);
            return;
          }
          setProjects(
            data.data.map((project) => {
              return {
                id: project.id,
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
      <div style={{
        width: "100%",
        padding: "20px 30px",
        backgroundColor: "#f0f0f0",
      }}>
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
                className={`filter-button ${filterBy === "all_projects" ? "active" : ""
                  }`}
                onClick={() => setFilterBy("all_projects")}
              >
                All Projects
              </button>
              <button
                className={`filter-button ${filterBy === "owner" ? "active" : ""
                  }`}
                onClick={() => setFilterBy("owner")}
              >
                Your Projects
              </button>
              <button
                className={`filter-button ${filterBy === "collaborator" ? "active" : ""
                  }`}
                onClick={() => setFilterBy("collaborator")}
              >
                Your Collaborations
              </button>
              <button
                className={`filter-button ${filterBy === "archived" ? "active" : ""
                  }`}
                onClick={() => setFilterBy("archived")}
              >
                Archived Projects
              </button>
              <button
                className={`filter-button ${filterBy === "trashed" ? "active" : ""
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
              <button
                className="upgrade-button"
                onClick={() => {
                  navigate("/researchPickPricing");
                }}
              >
                Upgrade
              </button>
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
                onClick={() => (navigate("/project/new"))}
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
                    (navigate(`/project/${project.id}`))
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
                      let token = localStorage.getItem("token");
                      const response = await fetch(
                        `http://pocapi.researchpick.com/api/downloadword?id=${project.id}`,
                        {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      if (response.ok) {
                        const result = await response.json();
                        console.log(result);
                        alert(
                          "File downloaded successfully. Please check the download folder."
                        );
                        window.open(
                          result.filepath,
                          "_blank",
                          "noopener,noreferrer"
                        );
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
