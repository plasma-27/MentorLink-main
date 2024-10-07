const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Store user data from the token in the request
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = authMiddleware;
