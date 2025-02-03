const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
});

// Handle connection errors
redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
redisClient.connect();

module.exports = redisClient;
