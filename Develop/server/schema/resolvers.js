const { AuthenticationError, UserInputError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mongoose User model

const secret = process.env.JWT_SECRET || 'vewwysecwet';
const expiration = process.env.JWT_EXPIRATION || '2h';

// Helper function to sign JWT tokens
const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const resolvers = {
  Query: {
    // Fetch the authenticated user's data
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id)
          .select('-__v -password')
          .populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },

    // Fetch a single user by ID or username
    getSingleUser: async (parent, { id, username }, context) => {
      if (!id && !username) {
        throw new UserInputError('You must provide either an ID or a username');
      }

      const query = id ? { _id: id } : { username: username };
      const foundUser = await User.findOne(query).select('-__v -password').populate('savedBooks');

      if (!foundUser) {
        throw new UserInputError('Cannot find a user with the provided identifier');
      }

      return foundUser;
    },
  },

  Mutation: {
    // User login
    login: async (parent, { username, email, password }) => {
      if (!password || (!email && !username)) {
        throw new UserInputError('Please provide either email or username and a password');
      }

      // Find user by email or username
      const user = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });

      if (!user) {
        throw new AuthenticationError("Wrong Username/Email or password");
      }

      // Check if the password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong Username/Email or password');
      }

      // Sign token and return Auth payload
      const token = signToken(user);
      return { token, user };
    },

    // Create a new user
    createUser: async (parent, { username, email, password }) => {
      // Check if the email or username is already in use
      const existingUser = await User.findOne({
        $or: [{ email: email }, { username: username }],
      });

      if (existingUser) {
        throw new UserInputError('Username or email already in use');
      }

      // Create the user
      const user = await User.create({ username, email, password });

      // Sign token and return Auth payload
      const token = signToken(user);
      return { token, user };
    },

    // Save a book to the authenticated user's savedBooks
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { savedBooks: bookData } },
            { new: true, runValidators: true }
          ).populate('savedBooks');

          return updatedUser;
        } catch (err) {
          throw new UserInputError('Error saving book', { errors: err });
        }
      }
      throw new AuthenticationError('You need to be logged in to save a book');
    },

    // Delete a book from the authenticated user's savedBooks
    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        ).populate('savedBooks');

        if (!updatedUser) {
          throw new UserInputError("Couldn't find user with this id!");
        }

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in to delete a book');
    },
  },
};

module.exports = resolvers;
