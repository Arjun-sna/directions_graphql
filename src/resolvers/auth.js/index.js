const { AuthController } = require('../../controllers');

module.exports = [{
  Mutation: {
    signUp: async (parent, newUserData) => {
      await AuthController.createUser(newUserData);

      return true;
    }
  }
}];
