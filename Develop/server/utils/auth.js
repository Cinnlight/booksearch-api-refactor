const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET_KEY;
const expiration = process.env.JWT_EXPIRATION;

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
