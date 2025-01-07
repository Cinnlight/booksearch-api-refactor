const { signToken, AuthenticationError } = require('../utils/auth');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || 'vewwysecwet';
const expiration = process.env.JWT_EXPIRATION || '2h';

const resolvers = {
};

module.exports = resolvers;
