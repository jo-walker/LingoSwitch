const express = require('express');
const connectDB = require('./config/db');
const stringRoutes = require('./routes/strings');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/strings', stringRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
