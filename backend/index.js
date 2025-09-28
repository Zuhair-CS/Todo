// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON bodies

// Import routes
const todoRoutes = require('./routes/todos');

// Use routes
app.use('/todos', todoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});