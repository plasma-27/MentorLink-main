// controllers/tokenController.js

const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
require('dotenv').config();

// Retrieve Agora credentials from environment variables
const appId = process.env.AGOR_APP_ID;
const appCertificate = process.env.AGOR_APP_CERTIFICATE;

// Function to generate a new Agora token
const generateToken = (req, res) => {
  try {
    const channelName = 'channel1'; // Channel name
    const uid = 0; // Use 0 for auto-generated UID

    // Generate the token
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      RtcRole.PUBLISHER,
      Math.floor(Date.now() / 1000) + 3600 // Token expiration time (e.g., 1 hour)
    );

    // Send the token as response
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateToken };
