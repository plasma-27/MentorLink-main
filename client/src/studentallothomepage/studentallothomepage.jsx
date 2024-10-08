import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import students from '../data/studentsallotdata'; // Ensure the import path is correct
import './studentallothomepage.css'; // Make sure to import the CSS

const StudentAllotHome = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { student } = location.state || {}; // Get student details from the state

  // Find the student data from the imported data
  const studentData = students.find(stud => stud.name === student?.name);

  // Handler for Chat button
  const handleChatClick = () => {
    navigate('/chat'); // Navigate to /chat
  };

  // Handler for Video button
  const handleVideoClick = () => {
    navigate('/videocall'); // Navigate to /videocall
  };

  return (
    <div className="student-allot-home">
      <h1>Welcome, {studentData ? studentData.name : 'Student'}!</h1>

      {studentData ? (
        <>
          <p>Name: {studentData.name}</p>
          <p>Tech Stack: {studentData.techStack}</p>
          <p>Year Allotted: {studentData.yearAllotted}</p>
        </>
      ) : (
        <p>No student details found</p>
      )}

      {/* Buttons for Chat and Video */}
      <div className="action-buttons">
        <button className="chat-button" onClick={handleChatClick}>Chat</button>
        <button className="video-button" onClick={handleVideoClick}>Video</button>
      </div>
    </div>
  );
};

export default StudentAllotHome;
