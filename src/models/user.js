const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  User.find = async function({ username = null, email = null, id = null}) {
    const user = await User.findOne({
      where: { [Op.or]: [ { username }, { email }, { id } ] }
    });

    return user;
  }

  User.createUserIfNotExists = async function({ username, email, password }) {
    const [user, created] = await User.findOrCreate({
      where: { [Op.or]: [ { username }, { email } ] },
      defaults: { username, email, password }
    });

    return [ user, created ];
  }

  return User;
}