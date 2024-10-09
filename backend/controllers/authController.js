const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator'); 
const jwt = require('jsonwebtoken');
// Signup
exports.signup = async (req, res) => {
  try {
    // 1. Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, bio, skills, linkedinID } = req.body;

    // 2. Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create a new user instance with a unique userId
    user = new User({
      name,
      email, // Using email as the unique identifier
      password: hashedPassword,
      role, // 'mentor' or 'mentee'
      bio,
      skills,
      linkedinID, // Save the linkedinID during signup
    });

    // 5. Save the user to the database
    await user.save();

    // 6. Return success response
    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        userId: user.email, // Using email as the unique identifier
        name: user.name,
        email: user.email,
        role: user.role,
        linkedinID: user.linkedinID, // Return linkedinID
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Login
exports.login = async (req, res) => {
  try {
    // 1. Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 2. Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Use an environment variable for the secret key
      { expiresIn: '1h' } // Token expiration time
    );
    
    // 4. Return success response with user details
    res.status(200).json({
      msg: 'Login successful',
      user: {
        userId: user.email, // Email as the unique identifier (userId)
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
