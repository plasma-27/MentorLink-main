const Session = require('../models/Session');
const User = require('../models/User');
const Project = require('../models/Project');
// Schedule a session
exports.scheduleSession = async (req, res) => {
  try {
    // 1. Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { mentee, mentor, project, mode, scheduledAt, duration } = req.body;

    // 2. Check if the mentee and mentor exist
    const menteeUser = await User.findOne({ email: mentee, role: 'mentee' });
    const mentorUser = await User.findOne({ email: mentor, role: 'mentor' });
    if (!menteeUser) {
      return res.status(404).json({ msg: 'Mentee not found' });
    }
    if (!mentorUser) {
      return res.status(404).json({ msg: 'Mentor not found' });
    }

    // 3. Check if the project exists and is related to the mentee
    const projectRecord = await Project.findOne({ _id: project, mentee: menteeUser._id });
    if (!projectRecord) {
      return res.status(404).json({ msg: 'Project not found or does not belong to the mentee' });
    }

    // 4. Create a new session
    const newSession = new Session({
      mentee: menteeUser._id,
      mentor: mentorUser._id,
      project: projectRecord._id,
      mode,
      scheduledAt,
      duration, // Duration in minutes
    });

    // 5. Save the session to the database
    await newSession.save();

    // 6. Return success response
    res.status(201).json({
      msg: 'Session scheduled successfully',
      session: newSession
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Get sessions
exports.getSessions = async (req, res) => {
  try {
    // 1. Extract user ID and role from request params or user context
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // 2. Determine role and find sessions accordingly
    let sessions;

    if (user.role === 'mentee') {
      // Find sessions where the user is the mentee
      sessions = await Session.find({ mentee: user._id }).populate('mentor project');
    } else if (user.role === 'mentor') {
      // Find sessions where the user is the mentor
      sessions = await Session.find({ mentor: user._id }).populate('mentee project');
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }

    // 3. Return the list of sessions
    res.status(200).json({
      sessions
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Add feedback
exports.addFeedback = async (req, res) => {
  try {
    // 1. Extract session ID and feedback from the request body
    const { sessionId, feedback } = req.body;

    // 2. Validate the input
    if (!sessionId || !feedback) {
      return res.status(400).json({ msg: 'Session ID and feedback are required' });
    }

    // 3. Find the session by its ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ msg: 'Session not found' });
    }

    // 4. Ensure the user making the request is the mentor for this session
    const userId = req.user._id; // Assuming req.user contains authenticated user details
    if (session.mentor.toString() !== userId.toString()) {
      return res.status(403).json({ msg: 'Only the assigned mentor can add feedback' });
    }

    // 5. Add feedback to the session
    session.feedback = feedback; // Assuming `feedback` is a field in your session schema

    // 6. Save the updated session
    await session.save();

    // 7. Return success response
    res.status(200).json({
      msg: 'Feedback added successfully',
      session
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
