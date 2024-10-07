import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Register from './register/Register';
import Home from './home/Home';
import VideoCall from './videocall/videocall';
import Chat from './chat/chat';
import Navbar from './navigation/Navbar';
import MentorHome from './mentor/MentorHome';
import StudentAllotHome from './studentsallothome/StudentAllotHome';
import ProjectHome from './ProjectHome/ProjectHome';
import MentorAllotHome from './MentorAllotHome/MentorAllotHome'; // Import the new component
import mentorData from './data/mentordata';

function App() {
  const loggedInUsername = localStorage.getItem('loggedInUser');

  return (
    <Router>
      {/* Conditionally render the Navbar if the user is logged in */}
      {loggedInUsername && <Navbar loggedInUsername={loggedInUsername} />}

      <Routes>
        {/* Redirect to /login if no user is logged in */}
        <Route path="/" element={loggedInUsername ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/home" element={loggedInUsername ? <Home /> : <Navigate to="/login" />} />
        <Route path="/videocall" element={loggedInUsername ? <VideoCall /> : <Navigate to="/login" />} />
        <Route path="/chat" element={loggedInUsername ? <Chat /> : <Navigate to="/login" />} />

        {/* MentorHome should pass the mentor data */}
        <Route
          path="/mentorhome"
          element={loggedInUsername ? <MentorHome mentor={mentorData.find(m => m.username === loggedInUsername)} /> : <Navigate to="/login" />}
        />

        {/* Route for StudentAllotHome */}
        <Route
          path="/studentallothome"
          element={loggedInUsername ? <StudentAllotHome /> : <Navigate to="/login" />}
        />

        {/* Route for ProjectHome with dynamic projectName parameter */}
        <Route
          path="/projecthome/:projectName"
          element={loggedInUsername ? <ProjectHome /> : <Navigate to="/login" />}
        />

        {/* New route for MentorAllotHome with dynamic mentor name */}
        <Route
          path="/mentorallothome/:mentorName"
          element={loggedInUsername ? <MentorAllotHome /> : <Navigate to="/login" />}
        />
      </Routes>
      
    </Router>
  );
}

export default App;
