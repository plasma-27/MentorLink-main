const MentorMenteeConnect = require('../models/MentorMenteeConnect');
const User = require('../models/User');

// Request mentorship
exports.requestMentorship = async (req, res) => {
  try {
    const { mentorId, menteeId } = req.body;

    // Check if mentor and mentee exist
    const mentor = await User.findById(mentorId);
    const mentee = await User.findById(menteeId);

    if (!mentor || !mentee) {
      return res.status(404).json({ msg: 'Mentor or Mentee not found' });
    }

    // Check if a request already exists between the mentor and mentee
    const existingRequest = await MentorMenteeConnect.findOne({ mentor: mentorId, mentee: menteeId });
    if (existingRequest) {
      return res.status(400).json({ msg: 'Request already exists' });
    }

    // Create new mentorship request
    const mentorshipRequest = new MentorMenteeConnect({ mentor: mentorId, mentee: menteeId });
    await mentorshipRequest.save();

    res.status(201).json({ msg: 'Mentorship request sent', mentorshipRequest });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Respond to mentorship request
exports.respondToRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    // Find the mentorship request
    let request = await MentorMenteeConnect.findById(requestId);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }

    // Update request status and response date
    request.status = status;
    request.responseDate = Date.now();
    await request.save();

    res.status(200).json({ msg: `Request ${status}`, request });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all mentorship requests for a mentor
exports.getMentorshipRequests = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const requests = await MentorMenteeConnect.find({ mentor: mentorId })
      .populate('mentee', 'name email')
      .exec();

    if (!requests.length) {
      return res.status(404).json({ msg: 'No requests found' });
    }

    res.status(200).json(requests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all accepted mentees for a mentor
exports.getAcceptedMentees = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const acceptedMentees = await MentorMenteeConnect.find({
      mentor: mentorId,
      status: 'accepted'
    })
      .populate('mentee', 'name email')
      .exec();

    if (!acceptedMentees.length) {
      return res.status(404).json({ msg: 'No accepted mentees found' });
    }

    res.status(200).json(acceptedMentees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
