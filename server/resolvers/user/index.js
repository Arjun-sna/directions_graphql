const { UserController } = require('../../controllers');

module.exports = [{
  Query: {
    users: async () => {
      return await UserController.getAllUsers();
    }
  },
  Mutation: {
    updateUser: async (parent, { username }, { user }) => {
      await UserController.updateUser(user, username);

      return true;
    }
  }
}];
