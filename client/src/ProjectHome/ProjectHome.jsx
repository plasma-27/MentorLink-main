import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProjectHome.css";

const ProjectHome = () => {
  const location = useLocation(); // Get location object
  const navigate = useNavigate();
  
  // Extract projectId from the location state
  const projectId = location.state?.projectId; // Use optional chaining
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("projectId : navbar : ", projectId);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) {
        setError("Project ID is undefined.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/projects/details/${projectId}`
        );
        console.log("Fetched Project Details:", response.data.project);
        setProjectDetails(response.data.project);
      } catch (err) {
        if (err.response) {
          console.error(`Error: ${err.response.status} - ${err.response.data}`);
          setError(`Failed to fetch project details: ${err.response.statusText}`);
        } else if (err.request) {
          console.error("Error: No response received from the server", err.request);
          setError("No response from the server. Please try again later.");
        } else {
          console.error("Error: ", err.message);
          setError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  // Loading state
  if (loading) {
    return <div>Loading project details...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  // If no project details are found
  if (!projectDetails) {
    return <div>No project details found.</div>;
  }

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
        <strong>Mentees:</strong>{" "}
        {projectDetails.mentees.map((mentee, index) => (
          <span key={mentee._id}>
            {mentee.name} ({mentee.email})
            {index < projectDetails.mentees.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p>
        <strong>Mentors:</strong>{" "}
        {projectDetails.mentors.length > 0
          ? projectDetails.mentors.map((mentor, index) => (
              <span key={mentor._id}>
                {mentor.name} ({mentor.email})
                {index < projectDetails.mentors.length - 1 ? ", " : ""}
              </span>
            ))
          : "No mentors assigned"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(projectDetails.createdAt).toLocaleDateString()}
      </p>

      {/* Buttons for Chat and Video */}
      <div className="project-buttons">
        <button className="project-btn" onClick={() => navigate("/chat")}>
          Chat
        </button>
        <button className="project-btn" onClick={() => navigate("/videocall")}>
          Video
        </button>
      </div>
    </div>
  );
};

export default ProjectHome;
