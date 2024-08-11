  const { DataTypes } = require('sequelize');

  module.exports = (sequelize) => {
    const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      languages: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      history: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    }, {
      tableName: 'projects',
      timestamps: false,
    });

    Project.associate = (models) => {
      Project.hasMany(models.URL, { foreignKey: { name: 'projectId', allowNull: true }, as: 'urls' });
      Project.hasMany(models.String, { foreignKey: { name: 'projectId', allowNull: true }, as: 'strings' });
      Project.belongsToMany(models.User, { through: 'ProjectUser', foreignKey: 'projectId', as: 'users' });
    };
    

    return Project;
  };