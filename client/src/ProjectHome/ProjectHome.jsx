import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectHome.css';
import studentProjects from '../data/studentProject';

const ProjectHome = () => {
  const { projectName } = useParams(); // Get the project name from the URL
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Flatten all the projects and find the project by its name
    const allProjects = Object.values(studentProjects).flat();
    const project = allProjects.find(proj => proj.name === projectName); // Access "name" instead of "projectName"
    setProjectDetails(project);
  }, [projectName]);

  if (!projectDetails) {
    return <div>Loading project details...</div>;
  }

  return (
    <div className="project-home-container">
      <h2>{projectDetails.name}</h2>
      <p><strong>Status:</strong> {projectDetails.progress} complete</p>
      <p><strong>Description:</strong> {projectDetails.description}</p>
      <p><strong>Details:</strong> {projectDetails.details}</p>
    </div>
  );
};

export default ProjectHome;
