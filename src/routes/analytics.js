// src/routes/analytics.js
const express = require('express');
const Url = require('../models/Url');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Get analytics for a specific short URL
router.get('/:alias', async (req, res) => {
  const { alias } = req.params;

  try {
    // Find the URL
    const url = await Url.findOne({ shortUrl: alias, userId: req.user.id });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Get analytics data
    const analytics = await Analytics.find({ alias });

    // Calculate total clicks and unique users
    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    // Group clicks by date (last 7 days)
    const clicksByDate = analytics.reduce((acc, entry) => {
      const date = entry.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

   // Group clicks by OS
const osType = analytics.reduce((acc, entry) => {
  // Extract OS and browser name using regex
  const userAgent = entry.userAgent;
  const browserMatch = userAgent.match(/(Chrome|Firefox|Edge|Safari)\/(\d+\.\d+\.\d+)/);
  const osMatch = userAgent.match(/\(.*?\) (.*?)\)/);  // Matches OS information
  
  const browser = browserMatch ? browserMatch[1] : 'Unknown';
  const browserVersion = browserMatch ? browserMatch[2] : 'Unknown';
  const os = osMatch ? osMatch[1] : 'Unknown OS';
  
  // Combining Mozilla/5.0 and browser with version
  const fullBrowserInfo = `Mozilla/5.0 ${browser} ${browserVersion} on ${os}`;

  if (!acc[fullBrowserInfo]) {
    acc[fullBrowserInfo] = { uniqueClicks: 0, uniqueUsers: new Set() };
  }
  acc[fullBrowserInfo].uniqueClicks += 1;
  acc[fullBrowserInfo].uniqueUsers.add(entry.ipAddress);
  return acc;
}, {});

// Group clicks by device type
const deviceType = analytics.reduce((acc, entry) => {
  const device = entry.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop';
  if (!acc[device]) {
    acc[device] = { uniqueClicks: 0, uniqueUsers: new Set() };
  }
  acc[device].uniqueClicks += 1;
  acc[device].uniqueUsers.add(entry.ipAddress);
  return acc;
}, {});


    // Format response
    res.json({
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      osType: Object.entries(osType).map(([osName, data]) => ({
        osName,
        uniqueClicks: data.uniqueClicks,
        uniqueUsers: data.uniqueUsers.size,
      })),
      deviceType: Object.entries(deviceType).map(([deviceName, data]) => ({
        deviceName,
        uniqueClicks: data.uniqueClicks,
        uniqueUsers: data.uniqueUsers.size,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get topic-based analytics
router.get('/topic/:topic', async (req, res) => {
  const { topic } = req.params;

  try {
    // Find all URLs under the specified topic
    const urls = await Url.find({ topic, userId: req.user.id });

    // Get analytics for all URLs
    const analytics = await Analytics.find({ alias: { $in: urls.map((u) => u.shortUrl) } });

    // Calculate total clicks and unique users
    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    // Group clicks by date (last 7 days)
    const clicksByDate = analytics.reduce((acc, entry) => {
      const date = entry.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Format response
    res.json({
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      urls: urls.map((url) => ({
        shortUrl: url.shortUrl,
        totalClicks: analytics.filter((a) => a.alias === url.shortUrl).length,
        uniqueUsers: new Set(analytics.filter((a) => a.alias === url.shortUrl).map((a) => a.ipAddress)).size,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get overall analytics for the user
router.get('/over/overall', async (req, res) => {
  try {

    console.log("User ID:", req.user);
    // Find all URLs created by the user
    const urls = await Url.find({ userId: req.user.id });
    
    // Get analytics for all URLs
    const analytics = await Analytics.find({ alias: { $in: urls.map((u) => u.shortUrl) } });

    // Calculate total clicks and unique users
    const totalUrls = urls.length;
    const totalClicks = analytics.length;
    const uniqueUsers = new Set(analytics.map((a) => a.ipAddress)).size;

    // Group clicks by date (last 7 days)
    const clicksByDate = analytics.reduce((acc, entry) => {
      const date = entry.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Group clicks by OS
    const osType = analytics.reduce((acc, entry) => {
      const os = entry.userAgent.split(' ')[0]; // Simplified OS extraction
      if (!acc[os]) {
        acc[os] = { uniqueClicks: 0, uniqueUsers: new Set() };
      }
      acc[os].uniqueClicks += 1;
      acc[os].uniqueUsers.add(entry.ipAddress);
      return acc;
    }, {});

    // Group clicks by device type
    const deviceType = analytics.reduce((acc, entry) => {
      const device = entry.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop';
      if (!acc[device]) {
        acc[device] = { uniqueClicks: 0, uniqueUsers: new Set() };
      }
      acc[device].uniqueClicks += 1;
      acc[device].uniqueUsers.add(entry.ipAddress);
      return acc;
    }, {});

    // Format response
    res.json({
      totalUrls,
      totalClicks,
      uniqueUsers,
      clicksByDate: Object.entries(clicksByDate).map(([date, count]) => ({ date, count })),
      osType: Object.entries(osType).map(([osName, data]) => ({
        osName,
        uniqueClicks: data.uniqueClicks,
        uniqueUsers: data.uniqueUsers.size,
      })),
      deviceType: Object.entries(deviceType).map(([deviceName, data]) => ({
        deviceName,
        uniqueClicks: data.uniqueClicks,
        uniqueUsers: data.uniqueUsers.size,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;