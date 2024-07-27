const express = require('express');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const app = express();
const cors = require('cors');

require('dotenv').config();

connectDB();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(express.json({ extended: false }));
app.use(cors({
}));

app.use('/api/auth', userRoutes);
app.use('/api/complaints', complaintRoutes);

app.post('/storeParameters', async (req, res) => {
  try {
      const parameters = req.body.parameters;
      await Parameter.insertMany(parameters);
      res.status(200).json({ message: 'Parameters stored successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to store parameters', error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));