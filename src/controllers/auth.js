const { UserInputError } = require('apollo-server-express');
const { User } = require('../models');

class AuthController {
  static async createUser(newUserData) {
    const [user, created] = await User.createUserIfNotExists(newUserData);

    if (!created) {
      throw new UserInputError(
        'User with same email/username already exists.',
      ); 
    }

    return user;
  }
}

module.exports = AuthController;
