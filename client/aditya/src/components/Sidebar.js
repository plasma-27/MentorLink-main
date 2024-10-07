import React from 'react';
import './css/Sidebar.css';
import ChatWindow from './ChatWindow'; // Assuming ChatWindow is a separate component

const Sidebar = ({ participants, showChat, pinnedUsers, togglePinUser, remoteUsers }) => {
  return (
    <div className="sidebar p-3 bg-light border">
      {!showChat ? (
        <div>
          <h5>Participants</h5>
          <ul className="list-group">
            {participants.map((participant, index) => {
              const userId = participant.split(' ')[1]; // Extract user ID
              const isPinned = pinnedUsers.includes(userId); // Check if the user is pinned
              return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {participant}
                  <button
                    onClick={() => togglePinUser(userId)}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {isPinned ? 'Unpin' : 'Pin'}
                  </button>

                  {/* Show video if the user is pinned */}
                  {isPinned && (
                    <div className="sidebar-video">
                      <video
                        ref={(el) => {
                          if (el && remoteUsers[userId]) {
                            remoteUsers[userId].play(el);
                          } else {
                            console.warn(`No video track for user ${userId}`);
                          }
                        }}
                        autoPlay
                        className="sidebar-video-style"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <ChatWindow /> {/* Display chat window when showChat is true */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
