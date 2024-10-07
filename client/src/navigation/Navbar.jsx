import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/login-image.jpg';
import projectData from '../data/project';
import credentials from '../data/credentials';
import students from '../data/studentsallot'; // Import the students data
import mentorData from '../data/mentordata'; // Import mentor data

const Navbar = ({ loggedInUsername }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false); // Track the students sidebar
  const [isMentorSidebarOpen, setIsMentorSidebarOpen] = useState(false); // Track the mentors sidebar
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

  const toggleStudentsSidebar = () => {
    setIsStudentsOpen(!isStudentsOpen);
  };

  const toggleMentorSidebar = () => {
    setIsMentorSidebarOpen(!isMentorSidebarOpen);
  };

  const showHomeLink = location.pathname !== '/login' && location.pathname !== '/register';
  const showLogoutButton = location.pathname === '/home' || location.pathname === '/mentorhome' || location.pathname === '/studentallothome';
  const showSidebarButton = location.pathname === '/home' || location.pathname === '/ProjectHome';

  const handleLogout = () => {
    setProjects([]);
    navigate('/login');
  };

  const handleProjectClick = (project) => {
    navigate(`/projecthome/${project}`);
  };

  const handleStudentClick = (student) => {
    navigate('/studentallothome', { state: { student } }); // Pass the selected student as state
  };

  const handleMentorClick = (mentor) => {
    navigate(`/mentorallothome/${mentor.name}`); // Navigate to MentorAllotHome with mentor name
  };

  // Determine user role
  const isStudent = credentials.users.find(user => user.username === loggedInUsername)?.role === 'student';
  const isMentor = credentials.users.find(user => user.username === loggedInUsername)?.role === 'mentor';

  return (
    <nav className="navbar">
      {showSidebarButton && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          &#x22EE;
        </button>
      )}

      <div className="navbar-logo">
        <a href=""><img src={logo} alt="Logo" /></a>
      </div>

      {showHomeLink && (
        <div className="navbar-search-container">
          <input type="text" placeholder="Search..." className="navbar-search-input" />
          <FaSearch className="search-icon" />
        </div>
      )}

      <div className="navbar-links">
        {showHomeLink && !showLogoutButton && <Link to="/dashboard">Home</Link>}

        {/* Show Mentor button for students only */}
        {isStudent && (
          <button onClick={toggleMentorSidebar} className="mentor-button">Mentors</button>
        )}

        {/* Show Students button for mentors only */}
        {isMentor && (
          <button onClick={toggleStudentsSidebar} className="students-button">Students</button>
        )}

        {showLogoutButton ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* Sidebar for Projects */}
      {showSidebarButton && (
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

      {/* Sidebar for Mentors */}
      {isMentorSidebarOpen && (
        <aside className="mentors-sidebar open">
          <h4>Mentors:</h4>
          <ul>
            {mentorData.map((mentor, index) => (
              <li key={index}>
                <button className="mentor-button" onClick={() => handleMentorClick(mentor)}>
                  {mentor.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Sidebar for Students */}
      {isStudentsOpen && (
        <aside className="students-sidebar open">
          <h4>Students Under Mentorship:</h4>
          <ul>
            {students.map((student, index) => (
              <li key={index}>
                <button className="student-button" onClick={() => handleStudentClick(student)}>
                  {student.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
