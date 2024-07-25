module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    languages: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  return Project;
};