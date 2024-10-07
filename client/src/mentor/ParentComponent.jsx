import React, { useState, useEffect } from 'react';
// import MentorHome from './MentorHome';
import MentorHome from './mentor/MentorHome'; // Use exact casing
import mentorData from '../data/mentordata'; // Assuming you fetch from mentordata

const ParentComponent = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // Assuming you fetch the logged-in mentor's username (e.g., from localStorage)
    const username = 'sandesh'; // Replace this with dynamic login logic
    const foundMentor = mentorData.find(m => m.username === username);
    setMentor(foundMentor);
  }, []);

  return (
    <div>
      <MentorHome mentor={mentor} />
    </div>
  );
};

export default ParentComponent;
