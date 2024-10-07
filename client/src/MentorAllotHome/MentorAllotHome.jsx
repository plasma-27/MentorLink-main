import React from 'react';
import { useParams } from 'react-router-dom';
import mentorData from '../data/mentordata';
import './MentorAllotHome.css';

const MentorAllotHome = () => {
  const { mentorName } = useParams();

  // Find the mentor object that matches the mentorName from the URL
  const mentor = mentorData.find(mentor => mentor.name === mentorName);

  return (
    <div className="mentor-allot-home">
      {mentor ? (
        <div className="mentor-details">
          <h2>Mentor Details for {mentor.name}</h2>
          <p><strong>Name:</strong> {mentor.name} {mentor.surname}</p>
          <p><strong>College:</strong> {mentor.college}</p>
          <p><strong>Tech Stack:</strong> {mentor.techStack}</p>
          <p><strong>DOB:</strong> {mentor.dob}</p>
          <p><strong>Company:</strong> {mentor.company}</p>
        </div>
      ) : (
        <p>Mentor not found!</p>
      )}
    </div>
  );
};

export default MentorAllotHome;
