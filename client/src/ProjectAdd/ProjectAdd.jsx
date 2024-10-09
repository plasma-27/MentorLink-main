import React, { useState } from 'react';
import './ProjectAdd.css';

const ProjectAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mentees, setMentees] = useState('');
  const [status, setStatus] = useState('Active');
  const [mentors, setMentors] = useState('');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      mentees: mentees.split(','), // Assuming mentees are comma-separated
      status,
      mentors: mentors.split(','), // Assuming mentors are comma-separated
      createdDate,
    };

    // Submit the project data (for now, just log it)
    console.log('Project Data Submitted:', projectData);
    // Here you would typically send the data to your API or state management
    // For example: api.submitProject(projectData);
  };

  return (
    <div className="project-add-container">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mentees">Mentees (comma-separated):</label>
          <input
            type="text"
            id="mentees"
            value={mentees}
            onChange={(e) => setMentees(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ongoing">ongoing</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mentors">Mentors (comma-separated):</label>
          <input
            type="text"
            id="mentors"
            value={mentors}
            onChange={(e) => setMentors(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button-after-add-project">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectAdd;