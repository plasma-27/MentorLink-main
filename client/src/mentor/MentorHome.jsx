import React, { useEffect, useState } from 'react';
import './MentorHome.css';
import studentRequests from '../data/dummyStudentRequest'; // Import student requests

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
              <p><strong>{student.name} {student.surname}</strong></p>
              <p>Tech Stack: {student.techStack.join(', ')}</p>
              <p className="message">{student.message}</p>
              <div className="request-buttons">
                <button className="accept-btn" onClick={() => handleAccept(`${student.name} ${student.surname}`)}>Accept</button>
                <button className="decline-btn" onClick={() => handleDecline(`${student.name} ${student.surname}`)}>Decline</button>
              </div>
            </div>
          ))
        ) : (
          <p>No student requests available.</p>
        )}
      </div>
      <div className="mentor-info">
        <h2>Mentor Information</h2>
        <p><strong>Name:</strong> {mentor.name}</p>
        <p><strong>Surname:</strong> {mentor.surname}</p>
        <p><strong>Company:</strong> {mentor.company}</p>
        
        <p><strong>Tech Stack:</strong></p>
        <ul className="tech-stack-list">
          {mentor.techStack.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
        
        <p><strong>Year Passed:</strong> {mentor.yearPassed}</p>
        <p><strong>Date of Birth:</strong> {mentor.dob}</p>
        <p><strong>College:</strong> {mentor.college}</p>
      </div>
    </div>
  );
};

export default MentorHome;
