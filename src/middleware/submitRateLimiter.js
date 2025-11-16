// src/middleware/submitRateLimiter.js
const redisClient = require('../config/redis');

const submitCodeRateLimiter = async (req, res, next) => {
  try {
    // get user id (from your auth middleware)
    const userId = req.result?._id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: user not found' });
    }

    const redisKey = `submit_cooldown:${userId}`;

    // check if cooldown already active
    const exists = await redisClient.exists(redisKey);
    if (exists) {
      return res.status(429).json({
        error: 'Please wait 10 seconds before submitting again',
      });
    }

    // set cooldown for 10 seconds
    await redisClient.set(redisKey, 'cooldown_active', {
      EX: 10, // expires after 10 seconds
      NX: true, 
    });

    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = submitCodeRateLimiter;
