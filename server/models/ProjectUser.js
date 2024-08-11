const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    projectId: {
      type: DataTypes.STRING(5),
      primaryKey: true,  // Part of the composite primary key
      references: {
        model: 'projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Part of the composite primary key
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    timestamps: false,
    tableName: 'ProjectUsers',
  });

  return ProjectUser;
};