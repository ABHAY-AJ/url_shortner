const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics'); // Import Analytics model
const redisClient = require('../config/redis');

const router = express.Router();


// Fetch all URLs created by the user
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.user.id });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/shorten', async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  console.log(req.body);
  const shortUrl = customAlias || nanoid(6);

  // Save to MongoDB
  const url = new Url({ longUrl, shortUrl, customAlias, topic, userId: req.user.id });
  await url.save();

  // Save to Redis
  await redisClient.set(shortUrl, longUrl);

  res.json({ shortUrl, createdAt: url.createdAt });
});



module.exports = router;