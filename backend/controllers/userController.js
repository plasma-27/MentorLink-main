const User = require('../models/User');
const { validationResult } = require('express-validator');


// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    // 1. Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extract the userId (email) from the request parameters
    const userId = req.params.id;

    // 3. Find the user by email
    let user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 4. Update user fields based on request body
    const { name, bio, skills, mentorDetails, availability, education } = req.body;
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;

    // If the user is a mentor, allow updating of mentor-specific details
    if (user.role === 'mentor') {
      if (mentorDetails) {
        if (mentorDetails.expertise) user.mentorDetails.expertise = mentorDetails.expertise;
        if (mentorDetails.pastDomains) user.mentorDetails.pastDomains = mentorDetails.pastDomains;
      }
      if (availability !== undefined) user.availability = availability;
    }

    // Update education details
    if (education) {
      user.education = education; // Replace with new education data
    }

    // 5. Save the updated user to the database
    await user.save();

    // 6. Return the updated profile in the response
    res.status(200).json({
      msg: 'Profile updated successfully',
      user: {
        userId: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills,
        mentorDetails: user.role === 'mentor' ? user.mentorDetails : undefined,
        availability: user.role === 'mentor' ? user.availability : undefined,
        education: user.education, // Include education in the response
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // 1. Extract the userId (email) from the request parameters
    const userId = req.params.id;

    // 2. Find the user by email
    const user = await User.findOne({ email: userId });

    // 3. If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 4. Based on the user's role, return relevant data
    if (user.role === 'mentee') {
      res.status(200).json({
        userId: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills,
        projects: user.projects, // Projects can be populated if needed
      });
    } else if (user.role === 'mentor') {
      res.status(200).json({
        userId: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills,
        expertise: user.mentorDetails.expertise,
        pastDomains: user.mentorDetails.pastDomains,
        availability: user.availability,
      });
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};



exports.updateMenteeProfile = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the userId (email) from the request parameters
    const userId = req.params.id;

    // Find the user by email
    let user = await User.findOne({ email: userId, role: 'mentee' });
    if (!user) {
      return res.status(404).json({ msg: 'Mentee not found' });
    }

    // Update fields for the mentee
    const { name, bio, skills, education } = req.body;
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (education) user.education = education;

    // Save the updated mentee profile to the database
    await user.save();

    // Return the updated mentee profile
    res.status(200).json({
      msg: 'Mentee profile updated successfully',
      user: {
        userId: user.email,
        name: user.name,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        education: user.education,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.updateMentorProfile = async (req, res) => {
  try {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the userId (email) from the request parameters
    const userId = req.params.id;

    // Find the user by email and ensure they are a mentor
    let user = await User.findOne({ email: userId, role: 'mentor' });
    if (!user) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }

    // Update fields for the mentor
    const { name, bio, skills, mentorDetails, availability, education } = req.body;
    
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (mentorDetails) {
      if (mentorDetails.expertise) user.mentorDetails.expertise = mentorDetails.expertise;
      if (mentorDetails.pastDomains) user.mentorDetails.pastDomains = mentorDetails.pastDomains;
    }
    if (availability !== undefined) user.availability = availability;
    if (education) user.education = education;

    // Save the updated mentor profile to the database
    await user.save();

    // Return the updated mentor profile
    res.status(200).json({
      msg: 'Mentor profile updated successfully',
      user: {
        userId: user.email,
        name: user.name,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        mentorDetails: user.mentorDetails,
        availability: user.availability,
        education: user.education,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAvailableMentorsByDomain = async (req, res) => {
  try {
    // 1. Get the list of domains from the request query
    const domains = req.query.domains ? req.query.domains.split(',') : [];

    // Check if the user requested all mentors
    if (domains.length === 1 && domains[0].toLowerCase() === 'all') {
      // Return all mentors
      const allMentors = await User.find({ role: 'mentor' }).select('name email bio skills mentorDetails');
      return res.status(200).json(allMentors);
    }

    if (domains.length === 0) {
      return res.status(400).json({ msg: 'No domains provided' });
    }

    // 2. Find mentors who have expertise or past domains in the provided domains
    const mentors = await User.aggregate([
      {
        $match: {
          role: 'mentor',
          $or: [
            { 'mentorDetails.expertise': { $in: domains } },
            { 'mentorDetails.pastDomains': { $in: domains } }
          ]
        }
      },
      {
        $addFields: {
          expertiseMatchCount: {
            $size: {
              $filter: {
                input: '$mentorDetails.expertise',
                as: 'domain',
                cond: { $in: ['$$domain', domains] }
              }
            }
          },
          pastDomainsMatchCount: {
            $size: {
              $filter: {
                input: '$mentorDetails.pastDomains',
                as: 'domain',
                cond: { $in: ['$$domain', domains] }
              }
            }
          }
        }
      },
      {
        $sort: {
          expertiseMatchCount: -1, // Sort by expertise match count first
          pastDomainsMatchCount: -1 // Then sort by past domains match count
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          bio: 1,
          skills: 1,
          mentorDetails: 1,
          expertiseMatchCount: 1,
          pastDomainsMatchCount: 1
        }
      }
    ]);

    // 3. Return the list of available mentors
    res.status(200).json(mentors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};