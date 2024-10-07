import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import credentials from '../data/credentials'; // Import credentials
import mentorData from '../data/mentordata'; // Import mentor data

const Home = () => {
  const location = useLocation();
  const { loggedInUsername } = location.state || {}; // Access loggedInUsername from location state
  const [userInfo, setUserInfo] = useState(null);
  const [mentors, setMentors] = useState([]); // State to hold mentor data

  useEffect(() => {
    if (loggedInUsername) {
      // Fetch the user info from credentials based on the loggedInUsername
      const user = credentials.users.find(user => user.username === loggedInUsername);
      setUserInfo(user || null);
    }

    // Fetch mentor data
    setMentors(mentorData);
  }, [loggedInUsername]);

  // Function to handle mentorship application
  const handleApplyForMentorship = () => {
    alert('Your message has been sent to the mentor!'); // Alert message
  };

  return (
    <div className="home-page">
      {/* Mentor Details Section */}
      <div className="mentor-details-section">
        {mentors.length > 0 ? (
          mentors.map((mentor, index) => (
            <div key={index} className="mentor-container">
              <p><strong>Full Name:</strong> {mentor.name} {mentor.surname}</p>
              <p><strong>DOB:</strong> {mentor.dob}</p>
              <p><strong>College:</strong> {mentor.college}</p>
              <div className="tech-stack">
                <strong>Tech Stack:</strong>
                <ul className="tech-stack-list">
                  {mentor.techStack.map((tech, index) => (
                    <li key={index} className="tech-chip">{tech}</li>
                  ))}
                </ul>
              </div>
              <p><strong>Year Passed:</strong> {mentor.yearPassed}</p>
              <p><strong>Company:</strong> {mentor.company}</p>
              {/* Add onClick handler to the button */}
              <button className="custom-button" onClick={handleApplyForMentorship}>Apply For Mentorship</button>
            </div>
          ))
        ) : (
          <p>No mentor data available</p>
        )}
      </div>

      {/* User Information Section */}
      <div className="user-info-section">
        {userInfo ? (
          <div className="user-info">
            <h2>Your Profile</h2>
            <p><strong>Name:</strong> {userInfo.name} {userInfo.surname}</p>
            <p><strong>Year Passed:</strong> {userInfo.yearPassed}</p>
            {/* <p><strong>Company:</strong> {userInfo.company}</p> */}
            <div className="tech-stack">
              <strong>Tech Stack:</strong>
              <ul className="tech-stack-list">
                {userInfo.techStack.map((tech, index) => (
                  <li key={index} className="tech-chip">{tech}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>User information not available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
