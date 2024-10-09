import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import linkedinLogo from '../assets/linkedin-logo.png'; // Import the LinkedIn logo

const Home = () => {
  const location = useLocation();
  const { loggedInUsername } = location.state || {}; // Access loggedInUsername from location state
  const [userInfo, setUserInfo] = useState(null);
  const [mentors, setMentors] = useState([]); // State to hold mentor data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user info if loggedInUsername is present
    if (loggedInUsername) {
      fetch(`http://localhost:8000/api/users/profile/${loggedInUsername}`)
        .then(response => {
          if (!response.ok) throw new Error('User info fetch failed');
          return response.json();
        })
        .then(data => setUserInfo(data))
        .catch(error => console.error('Error fetching user info:', error));
    }
  
    // Fetch available mentors
    fetch('http://localhost:8000/api/users/available-mentors?domains=all')
      .then(response => {
        if (!response.ok) throw new Error('Mentor data fetch failed');
        return response.json();
      })
      .then(data => {
        setMentors(data); // Set fetched mentor data
        setLoading(false); // Disable loading
      })
      .catch(error => {
        console.error('Error fetching mentor data:', error);
        setLoading(false); // Disable loading even on error
      });
  }, [loggedInUsername]);

  console.log("mentor data fetched: ",mentors);
  

  // Function to handle mentorship application
  const handleApplyForMentorship = () => {
    alert('Your message has been sent to the mentor!'); // Alert message
  };

  // Function to handle LinkedIn connection
  const handleConnectWithLinkedIn = (linkedinUrl) => {
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank'); // Open LinkedIn URL in a new tab
    } else {
      alert('LinkedIn URL is not available for this mentor.'); // Alert if URL is not available
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="home-page">
      {/* Mentor Details Section */}
      <div className="mentor-details-section">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <div key={mentor._id} className="mentor-container">
              <p><strong>Full Name:</strong> {mentor.name}</p>
              <p><strong>Email:</strong> {mentor.email}</p>
              <p><strong>Bio:</strong> {mentor.bio}</p>
              <div className="tech-stack">
                <strong>Skills:</strong>
                <ul className="tech-stack-list">
                  {mentor.skills.map((tech, index) => (
                    <li key={index} className="tech-chip">{tech}</li>
                  ))}
                </ul>
              </div>
              <div className="tech-stack">
                <strong>Expertise:</strong>
                <ul className="tech-stack-list">
                  {mentor.mentorDetails.expertise.map((exp, index) => (
                    <li key={index} className="tech-chip">{exp}</li>
                  ))}
                </ul>
              </div>
              <div className="tech-stack">
                <strong>Past Domains:</strong>
                <ul>
                  {mentor.mentorDetails.pastDomains.map((domain, index) => (
                    <li key={index}>{domain}</li>
                  ))}
                </ul>
              </div>
              {/* Apply For Mentorship Button */}
              <button className="custom-button" onClick={handleApplyForMentorship}>
                Apply For Mentorship
              </button>
              {/* Connect With LinkedIn Button */}
              <button 
                className="custom-button" 
                onClick={() => handleConnectWithLinkedIn(mentor.linkedinID)} // Assuming linkedinUrl is available in mentor data
              >
                <img src={linkedinLogo} alt="LinkedIn Logo" style={{ width: '20px', marginRight: '5px' }} />
                Connect With LinkedIn
              </button>
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
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
            <p><strong>Bio:</strong> {userInfo.bio}</p>
            <div className="tech-stack">
              <strong>Skills:</strong>
              <ul className="tech-stack-list">
                {userInfo.skills.map((tech, index) => (
                  <li key={index} className="tech-chip">{tech}</li>
                ))}
              </ul>
            </div>
            <div className="tech-stack">
              <strong>Expertise:</strong>
              <ul className="tech-stack-list">
                {userInfo.expertise.map((exp, index) => (
                  <li key={index} className="tech-chip">{exp}</li>
                ))}
              </ul>
            </div>
            <p><strong>Past Domains:</strong></p>
            <ul>
              {userInfo.pastDomains.map((domain, index) => (
                <li key={index}>{domain}</li>
              ))}
            </ul>
            <p><strong>Availability:</strong> {userInfo.availability ? 'Available' : 'Not Available'}</p>
          </div>
        ) : (
          <p>User information not available</p>
        )}
      </div>
    </div>
  ); 
};

export default Home;