const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ProjectUser = sequelize.define('ProjectUser', {
    ProjectId: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      references: {
        model: 'Projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
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
  });

  return ProjectUser;
};