const mongoose = require('mongoose');

// Auth Schema (userId will be the user's email)
const authSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true, ref: 'User',}, // userId will store the email
    password: { type: String, required: true }
});

// Middleware to set userId as email before saving the Auth document
authSchema.pre('save', async function(next) {
    const doc = this;

    // Ensure userId is set to email (if not explicitly provided)
    if (!doc.userId) {
        doc.userId = doc.email; // Assuming 'email' is passed in req body
    }

    next();
});

const Auth = mongoose.model('Auth', authSchema,'auth');
module.exports = Auth;
