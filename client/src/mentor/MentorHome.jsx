import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MentorHome.css";
import placeholderImage from "../assets/pro2.webp"; // Placeholder image
import mentorImage from "../assets/pro.webp"; // Import mentor image

const MentorHome = () => {
  const location = useLocation();
  const mentor = location.state?.mentor; // Accessing mentor from location state

  console.log("Mentor home : mentor ", mentor);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (mentor && mentor._id) {
      // Fetch all mentorship requests for the mentor
      fetch(`http://localhost:8000/api/connections/requests/${mentor._id}`)
        .then((response) => response.json())
        .then((data) => {
          setStudents(data); // Directly set the response data to students
        })
        .catch((error) => {
          console.error("Error fetching mentorship requests:", error);
        });
    }
  }, [mentor]);

  const handleResponse = (menteeName, requestId, status) => {
    // Send PUT request to respond to mentorship request
    fetch(`http://localhost:8000/api/connections/respond/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // Accept or reject status
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`${menteeName}'s request has been ${status}.`);
        // Update the students state to reflect the response
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student._id !== requestId)
        );
      })
      .catch((error) => {
        console.error("Error responding to request:", error);
      });
  };

  if (!mentor) {
    return <div className="mentor-info">Loading mentor data...</div>;
  }

  return (
    <div className="mentor-home-container">
      <div className="student-container">
        <h2>Student Requests</h2>
        {students.length > 0 ? (
          students.map((request) => (
            <div key={request._id} className="student-request">
              <div>
                {/* DP Image */}
                <img
                  src={placeholderImage}
                  alt="Student DP"
                  className="dp-image"
                />
                <strong className="student-name">
                  {request.mentee.name}
                </strong>
              </div>
              <p className="tech-stack">
                {/* You might want to include tech stack or other info if available */}
                Email: {request.mentee.email}
              </p>
              <p className="message">
                Status: {request.status} <br />
                Request Date: {new Date(request.requestDate).toLocaleString()}
              </p>
              <br />
              <div className="request-buttons">
                <button
                  className="accept-btn"
                  onClick={() =>
                    handleResponse(
                      request.mentee.name,
                      request._id,
                      "accepted"
                    )
                  }
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() =>
                    handleResponse(
                      request.mentee.name,
                      request._id,
                      "rejected"
                    )
                  }
                >
                  Decline
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No student requests available.</p>
        )}
      </div>
      <div className="mentor-info">
        <div className="mentor-header">
          <img src={mentorImage} alt="Mentor DP" className="mentor-image" />
          <h2>Mentor Information</h2>
        </div>
        <p>
          <strong>Name:</strong> {mentor.name}
        </p>
        <p>
          <strong>Surname:</strong> {mentor.surname}
        </p>
        <p>
          <strong>Company:</strong> {mentor.company}
        </p>

        <p>
          <strong>Tech Stack:</strong>
        </p>
        <ul className="tech-stack-list">
          {Array.isArray(mentor.techStack) && mentor.techStack.length > 0 ? (
            mentor.techStack.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))
          ) : (
            <li>No tech stack information available.</li> // Fallback if techStack is not available
          )}
        </ul>

        <p>
          <strong>Year Passed:</strong> {mentor.yearPassed}
        </p>
        <p>
          <strong>Date of Birth:</strong> {mentor.dob}
        </p>
        <p>
          <strong>College:</strong> {mentor.college}
        </p>
      </div>
    </div>
  );
};

export default MentorHome;
