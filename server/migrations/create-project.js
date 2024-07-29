// using Sequelize migrations to handle database table to support your schema (models/Project.js) 

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Projects', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        languages: {
          type: Sequelize.STRING, // Store JSON as a string
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Projects');
    }
  };  