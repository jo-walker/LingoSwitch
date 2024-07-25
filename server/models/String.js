module.exports = (sequelize, DataTypes) => {
  const String = sequelize.define('String', {
    projectId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    urlId: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'URLs',
        key: 'id'
      }
    },
    eng_us: DataTypes.TEXT,
    fr: DataTypes.TEXT,
    de: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    addedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    oldValue: DataTypes.TEXT,
    newValue: DataTypes.TEXT
  }, {
    timestamps: true
  });

  return String;
};