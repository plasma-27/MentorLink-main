import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StudentAllotHome.css';

const StudentAllotHome = () => {
  const location = useLocation(); // Get location object
  const navigate = useNavigate(); // Initialize the navigate function
  const student = location.state?.student; // Retrieve the student data from location state

  const handleChatClick = () => {
    navigate('/chat'); // Navigate to Chat
  };

  const handleVideoCallClick = () => {
    navigate('/videocall'); // Navigate to Video Call
  };

  return (
    <div className="student-allot-home-container">
      {/* <h1>Student Allotment Home</h1> */}
      {student && (
        <div className="student-info">
          <h2>{student.name}</h2>
          <p>Tech Stack: {student.techStack}</p> {/* Display tech stack if added */}
        </div>
      )}

      <div className="button-container">
        <button className="chat-button" onClick={handleChatClick}>
          Chat
        </button>
        <button className="video-call-button" onClick={handleVideoCallClick}>
          Video Call
        </button>
        
      </div>
    </div>
  );
};

export default StudentAllotHome;