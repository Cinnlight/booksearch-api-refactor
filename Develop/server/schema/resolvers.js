const { signToken, AuthenticationError } = require('../utils/auth');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'vewwysecwet';
const expiration = process.env.JWT_EXPIRATION || '2h';

const resolvers = {
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
