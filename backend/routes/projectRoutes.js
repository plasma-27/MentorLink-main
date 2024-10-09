const express = require('express');
const router = express.Router();
const { createProject, getProjectDetails, updateProject, assignMentor } = require('../controllers/projectController');

router.post('/create-project', createProject); // Mentee creates a project
router.get('/:id', getProjectDetails); // Get project details
router.put('/:id', updateProject); // Update project status or details
router.post('/assign-mentor', assignMentor);

module.exports = router;
