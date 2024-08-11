require('dotenv').config(); // Load environment variables from .env file

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      authPlugins: {
        mysql_native_password: () => () => require('mysql2/lib/auth_plugins').mysql_native_password
      }
    }
  }
);

module.exports = sequelize;