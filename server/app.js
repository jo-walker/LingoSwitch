const express = require('express');
const connectDB = require('./config/db');
const stringRoutes = require('./routes/strings');

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api/strings', stringRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
