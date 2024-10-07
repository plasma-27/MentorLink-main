// Footer.js
import React from 'react';
import VideoControls from './VideoControls';
import './css/Footer.css';

const Footer = ({ toggleVideo, toggleAudio, toggleChat, isVideoEnabled, isAudioEnabled }) => {
  return (
    <footer style={{ backgroundColor: '#424242', padding: '10px 0' }}>
      <VideoControls 
        toggleVideo={toggleVideo} 
        toggleAudio={toggleAudio} 
        toggleChat={toggleChat} 
        isVideoEnabled={isVideoEnabled}
        isAudioEnabled={isAudioEnabled} 
      />
    </footer>
  );
};

export default Footer;
