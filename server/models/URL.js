const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../config/database');

module.exports = (sequelize) => {
  const URL = sequelize.define('URL', {
    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,       
      defaultValue: () => uuidv4().slice(0, 4) // Generate 4-character ID from UUID 
    },
    url: {
      type: DataTypes.STRING(255),
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
        model: 'projects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  }, {
    timestamps: false,
  });

  // console.log('This is my model ---', URL);

  // Ensure associations are defined
  URL.associate = (models) => {
    URL.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    URL.hasMany(models.String, { foreignKey: 'urlId', as: 'strings' });
  };

  return URL;
};