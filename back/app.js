const express           = require('express');
const helmet            = require('helmet');
const bodyParser        = require('body-parser');
const path              = require('path');
const routeAuth         = require('./routes/authRoute');
const routePubli        = require('./routes/publiRoute');
const routeCommentary   = require('./routes/commentaryRoute');
const routeLike         = require('./routes/likeRoute');
const app               = express();

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

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/publication', routePubli);
app.use('/commentary', routeCommentary);
app.use('/like', routeLike);
app.use('/auth', routeAuth);

module.exports      = app;