const { generateToken } = require('../../../src/utils/auth');
const jwt = require('jsonwebtoken');

describe('Auth Utility', () => {
  it('generates a valid JWT token', () => {
    const user = { _id: '12345' };
    const token = generateToken(user);
    const decoded = jwt.decode(token);
    expect(decoded).toHaveProperty('_id', '12345');
  });
});
