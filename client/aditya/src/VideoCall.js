import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { Container, Row, Col } from 'react-bootstrap'; // Bootstrap components

import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './VideoCall.css';

const apiUrl="https:mentorlink.onrender.com";
const apiLocalUrl = 'http://localhost:8000';
const appId = '38e9ed59a3fc4818bbba36d74dddef5d';
const channelName = 'channel1';

const VideoCall = () => {
  const client = useRef(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })).current;
  const localVideoRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const [remoteUsers, setRemoteUsers] = useState({});
  const [token, setToken] = useState(null);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [pinnedUsers, setPinnedUsers] = useState([]); // State for pinned users
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await fetch(`${apiLocalUrl}/api/get-token`);
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    
    getToken(); // Get the token on mount
  }, []);
  
  useEffect(() => {
    const initAgora = async () => {
      if (!token) return; // Don't proceed until the token is available
      
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack;
          setRemoteUsers((prevUsers) => ({ ...prevUsers, [user.uid]: remoteVideoTrack }));
          setParticipants((prevParticipants) => [...prevParticipants, `User ${user.uid}`]);
        }
      });
      
      client.on('active-speaker', (evt) => setActiveSpeaker(evt.uid));
      
      try {
        await client.join(appId, channelName, token);
        const [localVideoTrack, localAudioTrack] = await Promise.all([
          AgoraRTC.createCameraVideoTrack(),
          AgoraRTC.createMicrophoneAudioTrack(),
        ]);
        localVideoTrackRef.current = localVideoTrack;
        localAudioTrackRef.current = localAudioTrack;
        if (localVideoRef.current) localVideoTrack.play(localVideoRef.current);
        await client.publish([localVideoTrack, localAudioTrack]);
      } catch (error) {
        console.error('Error during Agora initialization:', error);
      }
    };

    if (token) initAgora(); // Only call initAgora after token is fetched
    
    return () => {
      client.leave().catch(console.error);
      setRemoteUsers({});
    };
  }, [client, token]);
  
  const toggleVideo = async () => {
    if (localVideoTrackRef.current) {
      await localVideoTrackRef.current.setEnabled(!isVideoEnabled); // Toggle video
      setIsVideoEnabled((prev) => !prev);
    }
  };
  const toggleChat = () => setShowChat(!showChat);
  const toggleAudio = async () => {
    if (localAudioTrackRef.current) {
      await localAudioTrackRef.current.setEnabled(!isAudioEnabled); // Toggle audio
      setIsAudioEnabled((prev) => !prev);
    }
  };
  
  const togglePinUser = (userId) => {
    setPinnedUsers((prevPinned) => {
      if (prevPinned.includes(userId)) {
        return prevPinned.filter((id) => id !== userId); // Unpin the user
      } else {
        return [...prevPinned, userId]; // Pin the user
      }
    });
  };

  return (
    <Container fluid className="video-call-container">
      <Header />
      <Row className="main-layout" style={{ height: 'calc(100vh - 64px)' }}>
        <Col xs={12} md={9} className="video-section p-0">
          <VideoPlayer
            localVideoRef={localVideoRef}
            remoteUsers={remoteUsers}
            activeSpeaker={activeSpeaker}
            pinnedUsers={pinnedUsers} // Pass pinnedUsers to VideoPlayer
          />
        </Col>
        <Col xs={12} md={3} className="sidebar p-0">
          <Sidebar
            participants={participants}
            pinnedUsers={pinnedUsers} // Pass pinnedUsers to Sidebar
            togglePinUser={togglePinUser} // Pass toggle function to Sidebar
            remoteUsers={remoteUsers} // Pass remoteUsers to Sidebar for video rendering
            showChat={showChat}
          />
        </Col>
      </Row>
      <Footer 
        toggleVideo={toggleVideo} 
        toggleAudio={toggleAudio} 
        toggleChat={toggleChat}
        isVideoEnabled={isVideoEnabled} 
        isAudioEnabled={isAudioEnabled} 
      />
    </Container>
  );
};

export default VideoCall;
