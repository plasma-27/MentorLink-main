const mongoose = require('mongoose');


const SessionSchema = new mongoose.Schema({
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    mode: { type: String, enum: ['chat', 'video'], required: true },
    feedback: { type: String }, // Feedback from mentor after the session
    scheduledAt: { type: Date, required: true },
    duration: { type: Number }, // Duration in minutes
  });
  
  const Session = mongoose.model('Session', SessionSchema);
  module.exports = Session;
  