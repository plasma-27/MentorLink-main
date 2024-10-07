const express = require('express');
const router = express.Router();
const { createProject, getProjectDetails, updateProject, assignMentor } = require('../controllers/projectController');

router.post('/projects', createProject); // Mentee creates a project
router.get('/projects/:id', getProjectDetails); // Get project details
router.put('/projects/:id', updateProject); // Update project status or details
router.post('/projects/assign-mentor', assignMentor);

module.exports = router;
