require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

// Import the routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const app = express();

// Connection to Database
const connectToMongoDB = require('./dbConnection'); // Path to your MongoDB connection file
connectToMongoDB();

// Enable CORS for all routes
app.use(cors()); // You can configure this to allow specific origins if needed

app.use(bodyParser.json());

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api', tokenRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
