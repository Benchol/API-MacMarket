const express = require('express')
    // const fileStore = require('session-file-store')(session)
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const materialsRoutes = require('./routes/material.routes')
const userRoutes = require('./routes/user.routes')
const setSession = require('./middlewares/auth.session')
const session = require('./middlewares/redis.session')

mongoose.connect('mongodb://localhost:27017/electronicMaterial', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use(session)
app.use('/api/user', userRoutes)
app.use('/api/material', materialsRoutes)

module.exports = app;