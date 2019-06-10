'use strict';

module.exports = {
  up: (queryInterface) => {
    const { sequelize } = queryInterface;
    return sequelize.
      query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;').
      then(() => (sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))).
      catch(console.log);
  },

  down: () => { return; }
};