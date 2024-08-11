const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const URL = sequelize.define('URL', {
    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
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

  URL.associate = (models) => {
    URL.belongsTo(models.Project, { foreignKey: { name: 'projectId', allowNull: true, references: { model: 'projects', key: 'id' } }, as: 'project' });
    URL.hasMany(models.String, { foreignKey: 'urlId', as: 'strings' });
  };
  

  return URL;
};