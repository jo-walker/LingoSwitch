const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    languages: {
      type: DataTypes.ENUM('01', '02', '03'),
      allowNull: false,
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  return Project;
};