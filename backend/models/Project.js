const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of mentee IDs
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of mentor IDs
  createdAt: { type: Date, default: Date.now },
});

  
  const Project = mongoose.model('Project', ProjectSchema);
  module.exports = Project;
  