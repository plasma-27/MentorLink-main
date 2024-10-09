import React, { useState } from 'react';
import './ProjectAdd.css';

const ProjectAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mentees, setMentees] = useState('');
  const [status, setStatus] = useState('ongoing');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [githubUrl, setGithubUrl] = useState(''); // New state for GitHub URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch mentee IDs using emails
    const menteeEmails = mentees.split(',').map(email => email.trim());
    let menteeIds = [];

    try {
      const promises = menteeEmails.map(async (email) => {
        const response = await fetch(`http://localhost:8000/api/users/profile/${email}`);
        if (!response.ok) throw new Error(`Error fetching ID for ${email}`);
        const data = await response.json();
        return data._id; // Assuming the API returns an object with {id: 'userId'}
      });

      menteeIds = await Promise.all(promises); // Resolve all promises
    } catch (error) {
      console.error('Error fetching mentee IDs:', error);
      return; // Stop submission on error
    }

    const projectData = {
      title,
      description,
      mentees: menteeIds, // Sending mentee IDs
      status,
      createdDate,
      githubUrl, // Adding GitHub URL to project data
    };

    // Submit the project data (for now, just log it)
    console.log('Project Data Submitted:', projectData);

    const response = await fetch('http://localhost:8000/api/projects/create-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      alert('Project added successfully!');
    } else {  
      alert('Error adding project!');
    }                 




    // Here you would typically send the data to your API
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
          <label htmlFor="mentees">Mentees (comma-separated emails):</label>
          <input
            type="text"
            id="mentees"
            value={mentees}
            onChange={(e) => setMentees(e.target.value)}
            required
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

        {/* New form group for GitHub URL */}
        <div className="form-group">
          <label htmlFor="githubUrl">GitHub URL:</label>
          <input
            type="url"
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/your-project"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Project</button>
      </form>
    </div>
  );
};

export default ProjectAdd;

