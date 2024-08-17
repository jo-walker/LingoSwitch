const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const stringRoutes = require('./routes/string');
const projectRoutes = require('./routes/project');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); 
const urlRoutes = require('./routes/urls'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// Express app init
const app = express();

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());
app.use(xssClean());

// routes
app.use('/api/strings', stringRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/urls', urlRoutes);

// Sync the db and start the server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
    
    // Start the server after the database is synced
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});