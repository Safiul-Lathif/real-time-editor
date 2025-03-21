"use client";
import React, { useState, useEffect } from "react";
import "./credits.css"; // Import your CSS file
import SideBar from "../../components/sideBar/SideBar";
import PlanSection from "../../components/cards/planSectionCard";
import { TopBar } from "../../components/topBar/TopBar";
const projectsData = [
  // Sample project data (replace with your actual data)

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
  const [credits, setCredits] = useState({
    active_plan: "",
    available_credits: 0,
    consumed_credits: 0,
    purchase: []
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://pocapi.researchpick.com/api/creditsDashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log(data.data);
        setCredits(data.data);
        setProjects(data.data.purchase.map((purchase, index) => ({
          id: index,
          invoice: purchase.title,
          amount: ` $${purchase.amount}`,
          paidDate: purchase.paid_date,
          status: purchase.status,
          expireDate: purchase.expire_date,
          checkbox: false,
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div style={{
      display: "flex",
      height: "100%",
    }}>
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
          ></div>
          <PlanSection credits={credits} />
          <p
            style={{
              textAlign: "start",
              fontSize: "15px",
              paddingLeft: "10px",
              fontWeight: "bold",
              color: "#41075c",
            }}
          >
            Purchases / Utilization Log
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
              <div className="project-list-header-item subtitle">Title</div>
              <div className="project-list-header-item">Amount</div>
              <div className="project-list-header-item">Date</div>
              <div className="project-list-header-item">Type</div>
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
                <div className="project-list-item-text">{project.paidDate}</div>
                <div className="project-list-item-text">{project.status}</div>
                <div className="project-list-item-text">Download</div>
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
