const { User } = require('../models');

class UserController {
  static async getAllUsers() {
    const users = await User.findAll();

    return users;
  }

  static async getUserById(userId) {
    return await User.find({ id: userId });
  }

  static async updateUser(user, username) {
    await user.update({
      username
    });
  }
}

module.exports = UserController;
