// studentallothomepage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './studentallothomepage.css';

const StudentAllotHome = () => {
  const { studentName } = useParams(); // Get student name from URL

  return (
    <div className="student-allot-home">
      <h1>Welcome, {studentName}!</h1>
      {/* Add more content related to the student here */}
      <p>This is the student allotment home page.</p>
    </div>
  );
};

export default StudentAllotHome;
