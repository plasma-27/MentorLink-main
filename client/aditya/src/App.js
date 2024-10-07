import React, { useState } from 'react';
import './App.css';
import VideoCall from './VideoCall';
import ChatWindow from './components/ChatWindow'; // Import ChatWindow component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // State to toggle video call and chat window
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);

  // Function to handle video call button click
  const handleVideoCallClick = () => {
    setShowVideoCall(true);
    setShowChatWindow(false); // Close chat window when starting video call
  };

  // Function to handle chat button click
  const handleChatClick = () => {
    setShowChatWindow(true);
    setShowVideoCall(false); // Close video call when opening chat window
  };

  return (
    <div className={`App ${showVideoCall || showChatWindow ? 'interaction-active' : ''}`}>
      {!showVideoCall && !showChatWindow ? (
        <header className="App-header">
          <h1>Welcome to MentorLink</h1>
          <p>Your platform for project mentorship</p>
          <div className="button-group">
            <button onClick={handleVideoCallClick}>Start Video Call</button>
            <button onClick={handleChatClick}>Open Chat</button>
          </div>
        </header>
      ) : showVideoCall ? (
        <VideoCall />
      ) : (
        <ChatWindow />
      )}
    </div>
  );
}

export default App;