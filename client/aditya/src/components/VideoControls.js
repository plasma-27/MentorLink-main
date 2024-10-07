// VideoControls.js
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ChatIcon from '@mui/icons-material/Chat';

const VideoControls = ({ toggleVideo, toggleAudio, toggleChat, isVideoEnabled, isAudioEnabled }) => {
  return (
    <div className="d-flex justify-content-center mb-2">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{isVideoEnabled ? "Turn off video" : "Turn on video"}</Tooltip>}
      >
        <Button 
          onClick={toggleVideo} 
          variant={isVideoEnabled ? 'primary' : 'danger'} 
          className="me-2"
        >
          {isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{isAudioEnabled ? "Mute audio" : "Unmute audio"}</Tooltip>}
      >
        <Button 
          onClick={toggleAudio} 
          variant={isAudioEnabled ? 'secondary' : 'danger'} 
          className="me-2"
        >
          {isAudioEnabled ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>Toggle chat</Tooltip>}
      >
        <Button 
          onClick={toggleChat} 
          variant="info"
        >
          <ChatIcon />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default VideoControls;
