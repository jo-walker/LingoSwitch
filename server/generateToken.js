const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Add this line to debug

const user = {
  id: 1, // Replace with the user ID
  username: 'admin' // Replace with the username
};

const token = jwt.sign(user, process.env.JWT_SECRET, {
  expiresIn: '1h' // Token expiration time
});

console.log('Generated Token:', token);
