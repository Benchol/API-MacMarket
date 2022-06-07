const oneDay = 1000 * 60 * 60 * 24;
const redis = require('redis')
const connectRedis = require('connect-redis')
const session = require('express-session')

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
const RedisStore = connectRedis(session);
(async() => {
    await redisClient.set('userId', 'fzegmerg4zgrzef5')

    console.log('user id => ', await redisClient.get('userId'))
})
redisClient.on('error', (err) => {
    console.log('Could not establish a connection with redis ' + err);
})

redisClient.on('connect', (err) => {
    console.log('Connected to redis successfully');
})

module.exports = session({
    name: 'session-id',
    secret: 'ThisIsMySercret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: oneDay,
        secure: false
    },
    store: new RedisStore({
        client: redisClient
    }),
})