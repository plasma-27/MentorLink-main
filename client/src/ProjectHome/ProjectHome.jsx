import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate for navigation
import "./ProjectHome.css";
import studentProjects from "../data/studentProject";

const ProjectHome = () => {
  const { projectName } = useParams(); // Get the project name from the URL
  const [projectDetails, setProjectDetails] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Flatten all the projects and find the project by its name
    const allProjects = Object.values(studentProjects).flat();
    const project = allProjects.find((proj) => proj.name === projectName);
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
      <h2>{projectDetails.name}</h2>
      <p>
        <strong>Status:</strong> {projectDetails.progress} complete
      </p>
      <p>
        <strong>Description:</strong> {projectDetails.description}
      </p>
      <p>
        <strong>Details:</strong> {projectDetails.details}
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
