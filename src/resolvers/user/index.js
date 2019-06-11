const { UserController } = require('../../controllers');

module.exports = [{
  Query: {
    users: async () => {
      return await UserController.getAllUsers();
    }
  }
}];
