import React, { useEffect, useState } from "react";
import "./MentorHome.css";
import studentRequests from "../data/dummyStudentRequest"; // Import student requests
import placeholderImage from "../assets/pro2.webp"; // Placeholder image
import mentorImage from "../assets/pro.webp"; // Import mentor image

const MentorHome = ({ mentor }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulate fetching student data with a timeout
    setTimeout(() => {
      setStudents(studentRequests);
    }, 500); // Simulate network delay
  }, []);

  const handleAccept = (studentName) => {
    alert(`${studentName}, you accepted the request.`);
  };

  const handleDecline = (studentName) => {
    alert(`${studentName}, you declined the request.`);
  };

  if (!mentor) {
    return <div className="mentor-info">Loading mentor data...</div>;
  }

  return (
    <div className="mentor-home-container">
      <div className="student-container">
        <h2>Student Requests</h2>
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="student-request">
              <div>
                {/* DP Image */}
                <img
                  src={placeholderImage}
                  alt="Student DP"
                  className="dp-image"
                />
                <strong className="student-name">
                  {student.name} {student.surname}
                </strong>
              </div>
              <p className="tech-stack">
                Tech Stack: {student.techStack.join(", ")}
              </p>
              <p className="message">{student.message}</p>{" "}
              {/* Normal text here */}
              <br /> {/* Line break added */}
              <div className="request-buttons">
                <button
                  className="accept-btn"
                  onClick={() =>
                    handleAccept(`${student.name} ${student.surname}`)
                  }
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() =>
                    handleDecline(`${student.name} ${student.surname}`)
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
          {mentor.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
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
