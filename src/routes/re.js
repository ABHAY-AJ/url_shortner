const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics'); // Import Analytics model
const redisClient = require('../config/redis');

const router = express.Router();


router.get('/:alias', async (req, res) => {
    const { alias } = req.params;
    console.log("Short URL accessed:", alias);
  
    // Check Redis cache first
    const cachedLongUrl = await redisClient.get(alias);
  
    if (cachedLongUrl) {
      // Log analytics data
      const analytics = new Analytics({
        alias,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
        geolocation: {}, // You can add geolocation data using a service like ipstack
      });
      await analytics.save();
  
      return res.redirect(cachedLongUrl);
    }
  
    // If not in Redis, check MongoDB
    const url = await Url.findOne({ shortUrl: alias });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
  
    // Log analytics data
    const analytics = new Analytics({
      alias,
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
      geolocation: {}, // You can add geolocation data using a service like ipstack
    });
    await analytics.save();
  
    // Save to Redis for future requests
    await redisClient.set(alias, url.longUrl);
  
    res.redirect(url.longUrl);
  });

  module.exports = router;