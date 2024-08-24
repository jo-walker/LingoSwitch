const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const String = sequelize.define('String', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urlId: {
      type: DataTypes.STRING(4),
      allowNull: true,
      references: {
        model: 'urls',
        key: 'id',
      },
    },
    eng_us: {
      type: DataTypes.STRING(255),  // Changed from TEXT to VARCHAR(255)
      allowNull: false,  // English is required
    },
    fr: {
      type: DataTypes.STRING(255),  // Changed from TEXT to VARCHAR(255)
      allowNull: true,  // Optional
    },
    de: {
      type: DataTypes.STRING(255),  // Changed from TEXT to VARCHAR(255)
      allowNull: true,  // Optional
    },
    context: {
      type: DataTypes.STRING(255),  // VARCHAR(255) for context (like masculine, feminine, etc.)
      allowNull: false,  // Context is required
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,  // Default value is active
    },
  }, {
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['eng_us', 'fr', 'de', 'context'],  // Composite unique key based on language and context
      },
    ],
  });

  String.associate = (models) => {
    String.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    String.belongsTo(models.URL, { foreignKey: 'urlId', as: 'url' });
    String.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return String;
};