// const mongoose = require('mongoose');

// // User Schema (userId will be the user's email)
// const userSchema = new mongoose.Schema({
//     userId: { type: String, required: true, unique: true }, // userId will store the email
//     name: { type: String, required: true },
//     surname: { type: String, required: true },
//     email: { type: String, required: true, unique: true }, // Email is unique
//     gender: { type: String }
    
// });

// // Middleware to set userId as email before saving the user
// userSchema.pre('save', async function(next) {
//     const doc = this;

//     // Set userId to email before saving
//     if (!doc.userId) {
//         doc.userId = doc.email;
//     }

//     next();
// });

// const User = mongoose.model('User', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 }, // Unique user ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  bio: { type: String },
  skills: [{ type: String }],
  linkedinID : {type: String}, 
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  mentorDetails: {
    expertise: [{ type: String }],
    pastDomains: [{ type: String }],
    currentCompany: {type: String}
  },
  availability: { type: Boolean, default: false },
  profilePicture: { type: String },

  education: [{
    degree: { type: String }, 
    institution: { type: String }, 
    graduationYear: { type: Number }, 
  }],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
