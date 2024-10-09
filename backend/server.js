require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const mentorMenteeConnectRoutes = require('./routes/mentorMenteeConnectRoutes'); // New route for mentorship connections

const app = express();

// Connection to Database
const connectToMongoDB = require('./dbConnection'); // MongoDB connection
connectToMongoDB();

// Enable CORS for all routes (you can configure it to allow specific origins)
app.use(cors());

// Middleware to parse request bodies
app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api', tokenRoutes);
app.use('/api/connections', mentorMenteeConnectRoutes); // New route for mentor-mentee connections

// Set the port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
