const sequelize = require('../config/database');
const ProjectModel = require('./Project');
const URLModel = require('./URL.js'); 
const StringModel = require('./String');
const UserModel = require('./User');
const ProjectUserModel = require('./ProjectUser');

const Project = ProjectModel(sequelize);
const URL = URLModel(sequelize);
const String = StringModel(sequelize);
const User = UserModel(sequelize);
const ProjectUser = ProjectUserModel(sequelize);

Project.associate({ URL, String, User });
URL.associate({ Project, String });
String.associate({ Project, URL, User });
User.associate({ Project, String });
// ProjectUser.associate({ Project, User });

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  Project,
  URL,
  String,
  User,
  ProjectUser,
  sequelize,
};