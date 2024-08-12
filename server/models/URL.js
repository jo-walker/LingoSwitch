const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const URL = sequelize.define('URL', {
    id: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false,       
      // defaultValue: DataTypes.UUIDV4 // Generate a random UUID as the default value
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

  console.log('This is my model ---', URL);

  // Ensure associations are defined
  URL.associate = (models) => {
    URL.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    URL.hasMany(models.String, { foreignKey: 'urlId', as: 'strings' });
  };

  return URL;
};