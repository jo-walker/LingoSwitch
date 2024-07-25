const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const stringRoutes = require('./routes/string');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// Initialize Express app
const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:4200', // Angular app URL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());
app.use(xssClean());

// Define routes
app.use('/api/strings', stringRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});