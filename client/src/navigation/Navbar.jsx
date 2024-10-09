import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/login-image.jpg';
import projectData from '../data/project';
import credentials from '../data/credentials';
import mentorData from '../data/mentordata';
import students from '../data/studentsallotdata'; // Ensure the import path is correct

const Navbar = ({ loggedInUsername }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMentorSidebarOpen, setIsMentorSidebarOpen] = useState(false);
  const [isStudentSidebarOpen, setIsStudentSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch projects associated with the logged-in user
  useEffect(() => {
    if (loggedInUsername) {
      const user = credentials.users.find(user => user.username === loggedInUsername);
      setProjects(user ? projectData[user.username.toLowerCase()] || [] : []);
    }
  }, [loggedInUsername]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleMentorSidebar = () => setIsMentorSidebarOpen(prev => !prev);
  const toggleStudentSidebar = () => setIsStudentSidebarOpen(prev => !prev);

  const showHomeLink = location.pathname !== '/login' && location.pathname !== '/register';
  const showLogoutButton = ['/home', '/mentorhome', '/studentallothomepage'].includes(location.pathname);
  const showSidebarButton = ['/home', '/ProjectHome', '/mentorhome'].includes(location.pathname);
  const showMentorButton = location.pathname === '/home';
  const showStudentButton = location.pathname === '/mentorhome';

  const handleLogout = () => {
    setProjects([]);
    navigate('/login');
  };

  const handleProjectClick = (project) => {
    navigate(`/projecthome/${project}`);
  };

  const handleMentorClick = (mentorName) => {
    navigate(`/MentorAllotHome/${mentorName}`);
  };

  const handleStudentClick = (student) => {
    navigate(`/studentallothomepage`, { state: { student } });
  };

  // Determine if the navigation should be hidden
  const shouldHideNav = [
    '/chat',
    '/videocall',
    '/MentorAllotHome',
    '/projecthome' // Added the projecthome route here
  ].includes(location.pathname);

  return (
    <nav className="navbar">
      {!shouldHideNav && showSidebarButton && (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          &#x22EE;
        </button>
      )}

      <div className="navbar-logo">
        <a href="/">
          <img src={logo} alt="Logo" />
        </a>
      </div>

      {!shouldHideNav && showHomeLink && (
        <div className="navbar-search-container">
          <input type="text" placeholder="Search..." className="navbar-search-input" />
          <FaSearch className="search-icon" />
        </div>
      )}

      <div className="navbar-links">
        {!shouldHideNav && showHomeLink && !showLogoutButton && <Link to="/dashboard">Home</Link>}
        {!shouldHideNav && showMentorButton && <button onClick={toggleMentorSidebar} className="mentor-button">MENTORS</button>}
        {!shouldHideNav && showStudentButton && <button onClick={toggleStudentSidebar} className="student-button">STUDENT</button>}

        {showLogoutButton ? (
          <button onClick={handleLogout} className="logout-button">Logout</button>
        ) : (
          <>
            {!shouldHideNav && <Link to="/login">Login</Link>}
            {!shouldHideNav && <Link to="/register">Register</Link>}
          </>
        )}
      </div>

      {/* Sidebar for Projects */}
      {showSidebarButton && (
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Your Projects:</h2>
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
          {/* Add Projects button */}
          <button
            className="add-project-button"
            onClick={() => navigate('/projectadd')}  // Navigate to ProjectAdd component
          >
            Add Projects
          </button>
        </aside>
      )}



      {/* Sidebar for Mentors */}
      {isMentorSidebarOpen && (
        <aside className={`mentor-sidebar ${isMentorSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Your Mentors:</h2>
          <ul>
            {mentorData.length > 0 ? (
              mentorData.map((mentor, index) => (
                <li key={index}>
                  <button className="mentor-button" onClick={() => handleMentorClick(mentor.name)}>
                    {mentor.name}
                  </button>
                </li>
              ))
            ) : (
              <li>No mentors found</li>
            )}
          </ul>
        </aside>
      )}

      {/* Sidebar for Students */}
      {isStudentSidebarOpen && (
        <aside className={`student-sidebar ${isStudentSidebarOpen ? 'open' : 'closed'}`}>
          <h4>Students Under Mentorship:</h4>
          <ul>
            {students.length > 0 ? (
              students.map((student, index) => (
                <li key={index}>
                  <button className="student-button" onClick={() => handleStudentClick(student)}>
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