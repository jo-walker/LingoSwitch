const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize, Sequelize);
const Project = require('./Project')(sequelize, Sequelize);
const URL = require('./URL')(sequelize, Sequelize);
const String = require('./String')(sequelize, Sequelize);

Project.hasMany(String, { foreignKey: 'projectId' });
URL.hasMany(String, { foreignKey: 'urlId' });
User.hasMany(String, { foreignKey: 'userId' });

sequelize.sync();

module.exports = {
  User,
  Project,
  URL,
  String,
  sequelize
};
