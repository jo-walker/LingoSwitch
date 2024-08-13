const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.belongsToMany(models.Project, { through: 'ProjectUser', foreignKey: 'userId', as: 'projects' });
    User.hasMany(models.String, { foreignKey: 'userId', as: 'strings' });
  };

  return User;
};