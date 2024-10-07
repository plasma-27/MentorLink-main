import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/login-image.jpg';
import projectData from '../data/project';
import credentials from '../data/credentials';
import students from '../data/studentsallot'; // Import the students data

const Navbar = ({ loggedInUsername }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [studentsList, setStudentsList] = useState([]); // State for students list
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUsername) {
      const user = credentials.users.find(user => user.username === loggedInUsername);
      if (user) {
        const username = user.username.toLowerCase();
        setProjects(projectData[username] || []);
      } else {
        setProjects([]);
      }
    }
  }, [loggedInUsername]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showHomeLink = location.pathname !== '/login' && location.pathname !== '/register';
  const showLogoutButton = location.pathname === '/home' || location.pathname === '/mentorhome' || location.pathname === '/studentallothome';
  const showStudentsButton = location.pathname === '/mentorhome'; // Only show on MentorHome

  const handleLogout = () => {
    setProjects([]);
    navigate('/login');
  };

  const handleProjectClick = (project) => {
    navigate(`/projecthome/${project}`);
  };

  // Determine user role
  const isMentor = credentials.users.find(user => user.username === loggedInUsername)?.role === 'mentor';

  // Set students list when in MentorHome
  useEffect(() => {
    if (isMentor) {
      setStudentsList(students); // Set the students list
    }
  }, [isMentor]);

  return (
    <nav className="navbar">
      {showHomeLink && (
        <div className="navbar-logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
      )}

      {showHomeLink && (
        <div className="navbar-search-container">
          <input type="text" placeholder="Search..." className="navbar-search-input" />
          <FaSearch className="search-icon" />
        </div>
      )}

      <div className="navbar-links">
        {showHomeLink && !showLogoutButton && <Link to="/dashboard">Home</Link>}

        {showLogoutButton ? (
          <>
            {showStudentsButton && (
              <button className="students-button" onClick={toggleSidebar}>
                Students
              </button>
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* Sidebar for Projects */}
      {isSidebarOpen && (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Your Project:</h2>
          <ul>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <li key={index}>
                  <button className="project-button" onClick={() => handleProjectClick(project)}>
                    {project}
                  </button>
                </li>
              ))
            ) : (
              <li>No projects found</li>
            )}
          </ul>
        </aside>
      )}

      {/* Sidebar for Students */}
      {showStudentsButton && isSidebarOpen && (
        <aside className={`student-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Students Under Mentorship:</h2>
          <ul>
            {studentsList.length > 0 ? (
              studentsList.map((student, index) => (
                <li key={index}>
                  <button className="student-button">
                    {student.name}
                  </button>
                </li>
              ))
            ) : (
              <li>No students found</li>
            )}
          </ul>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
