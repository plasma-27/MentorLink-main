const Project = require('../models/Project');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    // 1. Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mentees, title, description, github } = req.body;

    // 2. Check if all mentees exist
    const menteeUsers = await User.find({ _id: { $in: mentees }, role: 'mentee' });
    if (menteeUsers.length !== mentees.length) {
      return res.status(404).json({ msg: 'One or more mentees not found' });
    }

    // 3. Create a new project
    const newProject = new Project({
      title,
      description,
      github, // GitHub link for the project
      mentees, // Array of mentee IDs
      // mentors will be empty initially
    });

    // 4. Save the project to the database
    await newProject.save();

    // 5. Update mentees' profiles with the new project
    await User.updateMany(
      { _id: { $in: mentees } },
      { $push: { projects: newProject._id } }
    );

    // 6. Return success response
    res.status(201).json({
      msg: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get project details based on user email
exports.getAllProjects = async (req, res) => {
  try {
    // 1. Extract the email from the request parameters
    const { email } = req.params;

    // 2. Find the user by email to ensure they exist and fetch their _id
    const user = await User.findOne({ email }).select('_id role');
    
    // 3. If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 4. Find all projects where the user is either a mentor or mentee
    const projects = await Project.find({
      $or: [
        { mentees: user._id },  // Match projects where the user is a mentee
        { mentors: user._id }   // Match projects where the user is a mentor
      ]
    })
      .populate('mentees', 'name email')   // Optionally include mentee details
      .populate('mentors', 'name email');  // Optionally include mentor details

    // 5. If no projects are found, return a 404 error
    if (!projects.length) {
      return res.status(404).json({ msg: 'No projects associated with this user found' });
    }

    // 6. Return the project details in the response
    res.status(200).json({
      msg: 'Projects fetched successfully',
      projects
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    // Extract fields from the request body
    const { title, description, github, status, mentors } = req.body;

    // Find the project by its ID
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Update only the fields that are provided
    if (title) project.title = title;
    if (description) project.description = description;
    if (github) project.github = github; // Update GitHub link
    if (status) {
      if (!['ongoing', 'completed'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status value' });
      }
      project.status = status;
    }
    if (mentors) {
      // Optional: Validate mentor IDs if necessary
      project.mentors = mentors;
    }

    // Save the updated project
    await project.save();

    // Return the updated project
    res.status(200).json({
      msg: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Assign mentor to project
exports.assignMentor = async (req, res) => {
  try {
    // 1. Extract the project ID and mentor ID from the request parameters or body
    const { projectId, mentorId } = req.body;

    // 2. Find the project by its ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // 3. Find the mentor by their ID
    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== 'mentor') {
      return res.status(404).json({ msg: 'Mentor not found or not a mentor' });
    }

    // 4. Check if the mentor is already assigned to the project
    if (project.mentors.includes(mentorId)) {
      return res.status(400).json({ msg: 'Mentor is already assigned to this project' });
    }

    // 5. Assign the mentor to the project
    project.mentors.push(mentorId);

    // 6. Save the updated project to the database
    await project.save();

    // 7. Return the updated project in the response
    res.status(200).json({
      msg: 'Mentor assigned successfully',
      project
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Get project details by project ID
exports.getProjectDetails = async (req, res) => {
  try {
    // 1. Extract the project ID from the request parameters
    const { id } = req.params;

    // 2. Find the project by its ID and populate mentees and mentors with all relevant details
    const project = await Project.findById(id)
      .populate('mentees', 'name email _id') // Populate mentees with their name, email, and _id
      .populate('mentors', 'name email _id'); // Populate mentors with their name, email, and _id

    // 3. If the project is not found, return a 404 error
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // 4. Return the project details in the response, including the GitHub link
    res.status(200).json({
      msg: 'Project details fetched successfully',
      project: {
        _id: project._id,
        title: project.title,
        description: project.description,
        github: project.github, // Include the GitHub link
        mentees: project.mentees.map(mentee => ({
          _id: mentee._id,
          name: mentee.name,
          email: mentee.email
        })),
        mentors: project.mentors.map(mentor => ({
          _id: mentor._id,
          name: mentor.name,
          email: mentor.email
        })),
        status: project.status,
        createdAt: project.createdAt,
        __v: project.__v
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};