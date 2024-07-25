module.exports = (sequelize, DataTypes) => {
  const URL = sequelize.define('URL', {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return URL;
};