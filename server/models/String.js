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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    de: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      defaultValue: true, //  default value as active
    },
  }, {
    timestamps: false,
  });

  String.associate = (models) => {
    String.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
    String.belongsTo(models.URL, { foreignKey: 'urlId', as: 'url' });
    String.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return String;
};