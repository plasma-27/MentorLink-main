const express = require('express');
const router = express.Router();
const mentorMenteeController = require('../controllers/mentorMenteeConnect');

// Request mentorship
router.post('/request', mentorMenteeController.requestMentorship);

// Respond to mentorship request
router.post('/respond/:requestId', mentorMenteeController.respondToRequest);

// Get mentorship requests for a mentor
router.get('/requests/:mentorId', mentorMenteeController.getMentorshipRequests);

// Get accepted mentees for a mentor
router.get('/mentees/:mentorId', mentorMenteeController.getAcceptedMentees);

module.exports = router;
