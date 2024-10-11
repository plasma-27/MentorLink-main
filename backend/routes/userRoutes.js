const express = require('express');
const router = express.Router();
const { updateMenteeProfile, updateMentorProfile, getUserProfile, getAvailableMentorsByDomain, getUserDetailsById } = require('../controllers/userController');

// Mentee routes
router.put('/profile/mentee/:id', updateMenteeProfile); // Update mentee profile

// Mentor routes
router.put('/profile/mentor/:id', updateMentorProfile); // Update mentor profile

// Common route for getting user profile (mentee or mentor)
router.get('/profile/:id', getUserProfile); // Get user profile by email (id)

// New route to get user details by ID
router.get('/profile/id/:id', getUserDetailsById); // Get user details by _id

// Get available mentors by domain
router.get('/available-mentors', getAvailableMentorsByDomain);

module.exports = router;
