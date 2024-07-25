require('dotenv').config(); // Load environment variables from .env file
const sequelize = require('../config/database'); // Adjust the path as needed
const { User } = require('../models'); // Adjust the path as needed
const bcrypt = require('bcrypt');

const createTestUser = async () => {
  try {
    const username = 'testuser1';
    const password = 'testpassword1';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      username,
      password: hashedPassword
    });

    console.log('Test user created successfully!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1); // Exit the process with an error code
  }
};

createTestUser();