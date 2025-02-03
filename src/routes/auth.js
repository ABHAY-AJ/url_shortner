const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, sub: googleId } = ticket.getPayload();

  let user = await User.findOne({ googleId });
  if (!user) {
    user = new User({ googleId, email });
    await user.save();
  }

  const jwtToken = jwt.sign({ id: user._id }, "aabbcc", { expiresIn: '1h' });
  res.json({ token: jwtToken });
});

module.exports = router;