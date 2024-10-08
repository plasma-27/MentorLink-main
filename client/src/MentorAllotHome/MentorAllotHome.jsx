import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import mentorData from '../data/mentordata';
import './MentorAllotHome.css';

const MentorAllotHome = () => {
  const { mentorName } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate

  // Find the mentor object that matches the mentorName from the URL
  const mentor = mentorData.find(mentor => mentor.name === mentorName);

  // Handlers for the Chat and Video buttons
  const handleChat = () => {
    navigate('/chat'); // Navigate to the chat page
  };

  const handleVideo = () => {
    navigate('/videocall'); // Navigate to the video call page
  };

  return (
    <div className="mentor-allot-home">
      {mentor ? (
        <div className="mentor-details">
          <h2>Mentor Details for {mentor.name}</h2>
          <p><strong>Name:</strong> {mentor.name} {mentor.surname}</p>
          <p><strong>College:</strong> {mentor.college}</p>
          <p><strong>Tech Stack:</strong> {mentor.techStack.join(', ')}</p>
          <p><strong>DOB:</strong> {mentor.dob}</p>
          <p><strong>Company:</strong> {mentor.company}</p>
          <div className="action-buttons">
            <button className="chat-btn" onClick={handleChat}>Chat</button>
            <button className="video-btn" onClick={handleVideo}>Video</button>
          </div>
        </div>
      ) : (
        <p>Mentor not found!</p>
      )}
    </div>
  );
};

export default MentorAllotHome;
