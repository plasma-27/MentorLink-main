import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { AttachFile, EmojiEmotions, Send } from '@mui/icons-material';
import './css/ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    const message = {
      uid: 'user_id', // Replace with actual user ID
      text: newMessage,
      file: file ? file.name : null,
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
    setFile(null);
    setSnackbarMessage('Message sent!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card className="chat-window">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <h5>Chat</h5>
          <Button variant="primary" size="sm">
            Let's Chat App
          </Button>
        </div>
      </Card.Header>
      <Card.Body style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            <strong>{message.uid}:</strong> {message.text}
            {message.file && (
              <a href={`/uploads/${message.file}`} className="file-link">Download {message.file}</a>
            )}
          </div>
        ))}
      </Card.Body>
      <Card.Footer>
        <Form.Group controlId="messageInput" className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Type message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="me-2"
          />
          <input
            type="file"
            className="form-control-file me-2"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="light" className="me-2">
              <AttachFile />
            </Button>
          </label>
          <Button onClick={handleSendMessage} variant="primary" className="me-2">
            <Send />
          </Button>
          <Button variant="light" className="me-2">
            <EmojiEmotions />
          </Button>
        </Form.Group>
      </Card.Footer>
      <Alert
        variant="success"
        show={snackbarOpen}
        onClose={handleSnackbarClose}
        dismissible
        style={{ position: 'absolute', bottom: '20px', right: '20px' }}
      >
        {snackbarMessage}
      </Alert>
    </Card>
  );
};

export default ChatWindow;
