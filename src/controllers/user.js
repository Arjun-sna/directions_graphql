const { User } = require('../models');

class UserController {
  static async getAllUsers() {
    const users = await User.findAll();
console.log({users})
    return users;
  }
}

module.exports = UserController;
