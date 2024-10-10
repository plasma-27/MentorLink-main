import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/login-image.jpg';

const Navbar = ({ loggedInUsername }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMentorSidebarOpen, setIsMentorSidebarOpen] = useState(false);
  const [isStudentSidebarOpen, setIsStudentSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch projects associated with the logged-in user from API
  useEffect(() => {
    if (loggedInUsername) {
      fetch(`http://localhost:8000/api/projects/${loggedInUsername}`)
        .then(response => { 
          if (!response.ok) throw new Error('Failed to fetch projects');
          return response.json();
        })
        .then(data => {
          setProjects(data.projects || []); // Set the projects from the API response
        })
        .catch(error => console.error('Error fetching projects:', error));
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

  const handleProjectClick = (projectId) => {
    console.log("projectId : navbar :before routing  ", projectId);
    navigate(`/projecthome`, { state: { projectId } }); // Pass projectId in state
  };

  const handleMentorClick = (mentorName) => {
    navigate(`/MentorAllotHome/${mentorName}`);
  };

  const handleStudentClick = (student) => {
    navigate(`/studentallothomepage`, { state: { student } });
  };

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
        {!shouldHideNav && showMentorButton && (
          <button onClick={toggleMentorSidebar} className="mentor-button">
            MENTORS
          </button>
        )}
        {!shouldHideNav && showStudentButton && (
          <button onClick={toggleStudentSidebar} className="student-button">
            STUDENTS
          </button>
        )}

        {showLogoutButton ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
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
              projects.map((project) => (
                <li key={project._id}>
                  <div className="project-info">
                    <p><strong>Title:</strong> {project.title}</p>
                    <p><strong>Status:</strong> {project.status}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                  </div>
                  <button className="project-button" onClick={() => handleProjectClick(project._id)}>
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <li>No projects found</li>
            )}
          </ul>
          {!showStudentButton && (
            <button
              className="add-project-button"
              onClick={() => navigate('/projectadd')}  // Navigate to ProjectAdd component
            >
              Add Projects
            </button>
          )}
        </aside>
      )}

      {/* Sidebar for Mentors */}
      {isMentorSidebarOpen && (
        <aside className={`mentor-sidebar ${isMentorSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Your Mentors:</h2>
          <ul>
            {/* Mentor data would be handled similarly to projects */}
          </ul>
        </aside>
      )}

      {/* Sidebar for Students */}
      {isStudentSidebarOpen && (
        <aside className={`student-sidebar ${isStudentSidebarOpen ? 'open' : 'closed'}`}>
          <h4>Students Under Mentorship:</h4>
          <ul>
            {/* Student data would be handled similarly to projects */}
          </ul>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
