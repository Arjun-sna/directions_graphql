const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { User } = require('../models');
const { JWT_SECRET } = process.env;
const saltRounds = 10;
const createToken = async (user, expiresIn = '365d') => {
  const { id } = user;

  return await jwt.sign({ id }, JWT_SECRET, { expiresIn, });
};

class AuthController {
  static async createUser(newUserData) {
    const { password, username, email } = newUserData;
    const hashesPassword = await bcrypt.hash(password, saltRounds)
    
    if (!username || !email) {
      throw new UserInputError(
        'Username and email are mandatory.',
      );
    }
    
    const [user, created] = await User.createUserIfNotExists({ ...newUserData, password: hashesPassword });

    if (!created) {
      throw new UserInputError(
        'User with same email/username already exists.',
      );
    }

    return user;
  }

  static async signIn(credentials) {
    const { userIdentifier, password } = credentials;
    const matchedUser = await User.find({
      username: userIdentifier,
      email: userIdentifier
    });

    if (matchedUser) {
      const isValidPassword = await bcrypt.compare(password, matchedUser.password);

      if (!isValidPassword) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(matchedUser) };
    }

    throw new UserInputError('User does not exist for this credentials');
  }
}

module.exports = AuthController;
