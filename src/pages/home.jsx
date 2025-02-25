import React from "react";

export const HomePage = () => {
  const [projects, setProjects] = React.useState([
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    { id: 4, name: "Project 4" },
    { id: 5, name: "Project 5" },
    { id: 6, name: "Project 6" },
    { id: 7, name: "Project 7" },
    { id: 8, name: "Project 8" },
    { id: 9, name: "Project 9" },
    { id: 10, name: "Project 10" },
    { id: 11, name: "Project 11" },
    { id: 12, name: "Project 12" },
    { id: 13, name: "Project 13" },
    { id: 14, name: "Project 14" },
    { id: 15, name: "Project 15" },
    { id: 16, name: "Project 16" },
    { id: 17, name: "Project 17" },
    { id: 18, name: "Project 18" },
    { id: 19, name: "Project 19" },
    { id: 20, name: "Project 20" },
    { id: 21, name: "Project 21" },
    { id: 22, name: "Project 22" },
    { id: 23, name: "Project 23" },
    { id: 24, name: "Project 24" },
    { id: 25, name: "Project 25" },
    { id: 26, name: "Project 26" },
    { id: 27, name: "Project 27" },
    { id: 28, name: "Project 28" },
    { id: 29, name: "Project 29" },
    { id: 30, name: "Project 30" },
    { id: 100, name: "New Project" },
  ]);

  return (
    <div>
      <h1>Home Page</h1>
      <ol style={{ textAlign: "left" }}>
        {projects.map((project) => (
          <li key={project.id} style={{ margin: "5px 0" }}>
            <a
              href={`/project/${project.id}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {project.name}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};
