// VideoPlayer.js
import React from 'react';
import './css/VideoPlayer.css';

const VideoPlayer = ({ localVideoRef, remoteUsers, activeSpeaker, pinnedUsers, togglePinUser }) => {
  return (
    <div className="video-section">
      <h4>Local Video</h4>
      <video ref={localVideoRef} autoPlay muted className="w-100 mb-3 border border-secondary" />

      <div className="remote-videos">
        {pinnedUsers.length > 0 ? (
          // Render pinned users
          <div className="pinned-videos row">
            {pinnedUsers.map((uid) => (
              <div key={uid} className="col-6 col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Pinned User {uid}</h5>
                    <video
                      ref={(el) => {
                        if (el && remoteUsers[uid]) {
                          remoteUsers[uid].play(el);
                        }
                      }}
                      autoPlay
                      className="w-100 border"
                    />
                    <button 
                      onClick={() => togglePinUser(uid)} 
                      className="btn btn-outline-danger mt-2"
                    >
                      Unpin
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos pinned.</p>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
