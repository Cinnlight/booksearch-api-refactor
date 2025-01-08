const jwt = require('jsonwebtoken');
require('dotenv').config();
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = process.env.JWT_SECRET_KEY || "vewwysecwet";
const expiration = process.env.JWT_EXPIRATION || "2h";



const authMiddleware = ({ req }) => {
  const token = req.headers.authorization || '';
  
  if (token) {
    try {
      // Verify the token and attach the user to the context
      const user = jwt.verify(token.split(' ')[1], secret);
      return { user };
    } catch (err) {
      throw AuthenticationError;
    }
  }
  
  return {};
};

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware,
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
