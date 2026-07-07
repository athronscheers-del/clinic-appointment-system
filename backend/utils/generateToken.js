const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
  // payload should be something like { id, role }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };