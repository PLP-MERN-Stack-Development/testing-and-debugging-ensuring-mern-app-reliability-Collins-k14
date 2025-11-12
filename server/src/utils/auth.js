const jwt = require('jsonwebtoken');

function generateToken(user) {
  return jwt.sign({ _id: user._id }, 'secret', { expiresIn: '1h' });
}

module.exports = { generateToken };
