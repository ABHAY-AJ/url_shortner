const redis = require('redis');

// Ensure you use the correct REDIS_URL from Render
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,  // ✅ Use environment variable
  socket: {
    tls: process.env.REDIS_TLS === 'true', // Render Redis requires TLS (for some plans)
    rejectUnauthorized: false, // For self-signed certificates (optional)
  }
});

// Handle connection errors
redisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('✅ Connected to Redis'))
  .catch((err) => console.error('❌ Redis connection failed:', err));

module.exports = redisClient;
