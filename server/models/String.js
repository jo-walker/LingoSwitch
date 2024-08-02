const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const String = sequelize.define('String', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    urlId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'URLs',
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
        model: 'Users',
        key: 'id',
      },
    },
    projectId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Projects',
        key: 'id',
      },
    },
    history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  return String;
};