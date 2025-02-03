const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url');
const reRoute = require("./routes/re")
const cors = require("cors");
const analyticsRoutes = require('./routes/analytics');
const { verifyToken } = require('./utils/auth');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/url', verifyToken, urlRoutes); // Protects API routes only
app.use('/api/urll', reRoute); // Public access for redirection
app.use('/api/analytics', verifyToken, analyticsRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener');


// Connect to Redis
const redisClient = redis.createClient({ host: 'redis', port: 6379 });
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});