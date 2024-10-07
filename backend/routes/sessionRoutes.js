const express = require('express');
const router = express.Router();
const { scheduleSession, getSessions, addFeedback } = require('../controllers/sessionController');

router.post('/sessions', scheduleSession); // Schedule a new mentorship session
router.get('/sessions/:id', getSessions); // Get session details
router.put('/sessions/:id/feedback', addFeedback); // Add feedback to the session

module.exports = router;

