const mongoose = require('mongoose');

const mentorMenteeConnectSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to mentor's profile
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to mentee's profile
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  requestDate: { type: Date, default: Date.now },
  responseDate: { type: Date }
});

const MentorMenteeConnect = mongoose.model('MentorMenteeConnect', mentorMenteeConnectSchema);
module.exports = MentorMenteeConnect;
