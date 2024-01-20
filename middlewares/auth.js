// middleware/auth.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. Token not provided.' });

  jwt.verify(token, '!iiii!%453453&&*89!!', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin rights required.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };
