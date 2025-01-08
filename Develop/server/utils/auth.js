const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET_KEY || "vewwysecwet";
const expiration = process.env.JWT_EXPIRATION || "2h";

// Define AuthenticationError before authMiddleware
const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

const authMiddleware = ({ req }) => {
  const token = req.headers.authorization || '';
  
  if (token) {
    try {
      const decoded = jwt.verify(token.split(' ')[1], secret);
      return { user: decoded };
    } catch (err) {
      throw AuthenticationError;
    }
  }
  
  return {};
};

module.exports = {
  AuthenticationError,
  authMiddleware,
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign(payload, secret, { expiresIn: expiration });
  },
};
