// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const app = express();
const cors = require('cors');

// Load environment variables
require('dotenv').config();

// Connect Database
connectDB();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api/auth', userRoutes);
app.use('/api/complaints', complaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
