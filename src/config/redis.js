const { createClient } = require('redis');
const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PAS,
    socket: {
        host: 'redis-11474.c16.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 11474
    }
});
module.exports = redisClient;



