const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import JWT middleware

// Auth routes
router.post('/signup', signup);
router.post('/login', login);

// New protected route
router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({
    msg: 'You have accessed a protected route!',
    user: req.user, // This is the user from the decoded JWT token
  });
});

module.exports = router;
