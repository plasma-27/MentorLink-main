// routers/tokenRouter.js

const express = require('express');
const { generateToken } = require('../controllers/tokenController');
const router = express.Router();

// Endpoint to get a new Agora token
router.get('/get-token', generateToken);

module.exports = router;
