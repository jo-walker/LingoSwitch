require('dotenv').config(); // Load environment variables from .env file

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lingo_switch', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        authPlugins: {
            mysql_native_password: () => () => require('mysql2/lib/auth_plugins').mysql_native_password
        }
    }
});

module.exports = sequelize;