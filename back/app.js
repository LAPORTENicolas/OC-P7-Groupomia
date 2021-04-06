const express       = require('express');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const path          = require('path');
const mariadb       = require('mariadb');
const app           = express();
const connection    = mariadb.createPool({
    host: '127.0.0.1',
    user: 'groupomania',
    password: 'password',
    database: 'Groupomania'
})

app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
    // Authorise les req de touts les origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    // Authorise les req GET POST DELETE PUT
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

module.exports      = app;