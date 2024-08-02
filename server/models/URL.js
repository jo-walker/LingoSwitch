const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const URL = sequelize.define('URL', {
    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'Projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    timestamps: false,
  });

  return URL;
};