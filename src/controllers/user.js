const { User } = require('../models');

class UserController {
  static async getAllUsers() {
    const users = await User.findAll();

    return users;
  }
}

module.exports = UserController;
