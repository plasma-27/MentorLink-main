const User = require('../models/User');
const { validationResult } = require('express-validator');


// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    let user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const { name, bio, skills, mentorDetails, availability, education, linkedinID, currentCompany } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (linkedinID) user.linkedinID = linkedinID; 
    if (currentCompany) user.mentorDetails.currentCompany = currentCompany; 

    if (user.role === 'mentor') {
      if (mentorDetails) {
        if (mentorDetails.expertise) user.mentorDetails.expertise = mentorDetails.expertise;
        if (mentorDetails.pastDomains) user.mentorDetails.pastDomains = mentorDetails.pastDomains;
      }
      if (availability !== undefined) user.availability = availability;
    }

    if (education) {
      user.education = education;
    }

    await user.save();
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
        education: user.education,
        linkedinID: user.linkedinID,
        currentCompany: user.mentorDetails.currentCompany,
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
    const userId = req.params.id;
    const user = await User.findOne({ email: userId });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Create a base response object including _id
    const userProfile = {
      _id: user._id, // Include the user's _id
      userId: user.email,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      skills: user.skills,
      education: user.education,
    };

    // Add role-specific fields
    if (user.role === 'mentee') {
      res.status(200).json({
        ...userProfile, // Spread the base profile
        projects: user.projects, // Only mentees have projects
      });
    } else if (user.role === 'mentor') {
      res.status(200).json({
        ...userProfile, // Spread the base profile
        expertise: user.mentorDetails.expertise,
        pastDomains: user.mentorDetails.pastDomains,
        availability: user.availability,
        linkedinID: user.linkedinID,
        currentCompany: user.mentorDetails.currentCompany,
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    let user = await User.findOne({ email: userId, role: 'mentee' });
    if (!user) {
      return res.status(404).json({ msg: 'Mentee not found' });
    }

    const { name, bio, skills, education } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (education) user.education = education;

    await user.save();
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    let user = await User.findOne({ email: userId, role: 'mentor' });
    if (!user) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }

    const { name, bio, skills, mentorDetails, availability, education, linkedinID, currentCompany } = req.body;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (linkedinID) user.linkedinID = linkedinID; 
    if (currentCompany) user.mentorDetails.currentCompany = currentCompany;

    if (mentorDetails) {
      if (mentorDetails.expertise) user.mentorDetails.expertise = mentorDetails.expertise;
      if (mentorDetails.pastDomains) user.mentorDetails.pastDomains = mentorDetails.pastDomains;
    }
    if (availability !== undefined) user.availability = availability;
    if (education) user.education = education;

    await user.save();
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
        linkedinID: user.linkedinID,
        currentCompany: user.mentorDetails.currentCompany,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};



exports.getAvailableMentorsByDomain = async (req, res) => {
  try {
    const domains = req.query.domains ? req.query.domains.split(',') : [];

    if (domains.length === 1 && domains[0].toLowerCase() === 'all') {
      const allMentors = await User.find({ role: 'mentor' }).select('name email bio skills mentorDetails linkedinID');
      return res.status(200).json(allMentors);
    }

    if (domains.length === 0) {
      return res.status(400).json({ msg: 'No domains provided' });
    }

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
          expertiseMatchCount: -1,
          pastDomainsMatchCount: -1
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          bio: 1,
          skills: 1,
          mentorDetails: 1,
          linkedinID: 1,  // Add this line to include linkedinID
          expertiseMatchCount: 1,
          pastDomainsMatchCount: 1,
        }
      }
    ]);

    res.status(200).json(mentors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};



// Get user details by ID
exports.getUserDetailsById = async (req, res) => {
  try {
    // 1. Extract the user ID from the request parameters
    const { id } = req.params;

    // 2. Find the user by their _id and populate project details
    const user = await User.findById(id)
      .populate('projects', 'title description status createdAt') // Populate all related project details
      .select('-password'); // Exclude the password from the response

    // 3. If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 4. Return every detail of the user
    res.status(200).json({
      msg: 'User details fetched successfully',
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        skills: user.skills,
        linkedinID: user.linkedinID,
        mentorDetails: user.mentorDetails, // Includes expertise, pastDomains, and currentCompany
        availability: user.availability,
        profilePicture: user.profilePicture,
        education: user.education, // Includes degree, institution, and graduation year
        projects: user.projects,   // Populated project details
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};