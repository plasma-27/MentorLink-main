const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectDetails, updateProject, assignMentor } = require('../controllers/projectController');


router.post('/create-project', createProject); // Mentee creates a project
router.get('/:email', getAllProjects); // Get project details based on user email
router.put('/:id', updateProject); // Update project status or details
router.post('/assign-mentor', assignMentor);
router.get('/details/:id', getProjectDetails); // Get project details by project ID

module.exports = router;
