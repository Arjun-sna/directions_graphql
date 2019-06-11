const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../../config/config.json')[env];
const logger = require('../utils/logger').makeLogger('SEQUELIZE');
const db = {};
const getSequelizeInstance = () => {
  const { database, username, password } = dbConfig;
  const config = {
    ...dbConfig,
    logging: (msg) => logger.info(msg),
  };
  return new Sequelize(database, username, password, config);
};

const sequelize = getSequelizeInstance();

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.getSequelizeInstance = getSequelizeInstance;

module.exports = db;
