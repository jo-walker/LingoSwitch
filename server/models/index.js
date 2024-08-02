const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')(sequelize);
const Project = require('./Project')(sequelize);
const URL = require('./URL')(sequelize);
const String = require('./String')(sequelize);
const ProjectUser = require('./ProjectUser')(sequelize);

Project.hasMany(URL, { foreignKey: 'projectId', as: 'urls' });
Project.hasMany(String, { foreignKey: 'projectId', as: 'strings' });
User.hasMany(String, { foreignKey: 'userId', as: 'strings' });
URL.hasMany(String, { foreignKey: 'urlId', as: 'strings' });

URL.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
String.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
String.belongsTo(URL, { foreignKey: 'urlId', as: 'url' });
String.belongsTo(User, { foreignKey: 'userId', as: 'user' });

sequelize.sync();

module.exports = {
  User,
  Project,
  URL,
  String,
  ProjectUser,
  sequelize
};