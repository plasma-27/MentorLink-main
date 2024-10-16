import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import "./ProjectHome.css";
import studentProjects from "../data/studentProject";

const ProjectHome = () => {
  const { projectName } = useParams(); // Get the project name from the URL
  const [projectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Flatten all the projects and find the project by its title
    const allProjects = Object.values(studentProjects).flat();
    const project = allProjects.find((proj) => proj.title === projectName);
    setProjectDetails(project);
  }, [projectName]);

  if (!projectDetails) {
    return <div>Loading project details...</div>;
  }

  // Handlers for navigating to chat and video call
  const handleChatClick = () => {
    navigate("/chat");
  };

  const handleVideoClick = () => {
    navigate("/videocall");
  };

  return (
    <div className="project-home-container">
      <h2>{projectDetails.title}</h2>
      <p>
        <strong>Status:</strong> {projectDetails.status}
      </p>
      <p>
        <strong>Description:</strong> {projectDetails.description}
      </p>
      <p>
        <strong>Mentees:</strong> {projectDetails.mentees.join(", ")}
      </p>
      <p>
        <strong>Mentors:</strong> {projectDetails.mentors.join(", ")}
      </p>
      <p>
        <strong>GitHub URL:</strong>{" "}
        <a href={projectDetails.githubUrl} target="_blank" rel="noopener noreferrer">
          {projectDetails.githubUrl}
        </a>
      </p>

      {/* Buttons for Chat and Video */}
      <div className="project-buttons">
        <button className="project-btn" onClick={handleChatClick}>
          Chat
        </button>
        <button className="project-btn" onClick={handleVideoClick}>
          Video
        </button>
      </div>
    </div>
  );
};

export default ProjectHome;
