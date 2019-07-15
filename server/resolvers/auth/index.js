const { AuthController } = require('../../controllers');

module.exports = [{
  Mutation: {
    signUp: async (parent, newUserData) => {
      const user = await AuthController.createUser(newUserData);

      return user;
    },
    signIn: async (parent, credentials) => {
      const token = await AuthController.signIn(credentials);

      return token;
    }
  }
}];
