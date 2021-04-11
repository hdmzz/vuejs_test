const express = require('express');
const app = express();
const testRoutes = require('./routes/test');
const postRoutes = require('./routes/posts');
const bodyParser = require('body-parser');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());


//Routes
app.use('/api/test', testRoutes);
app.use('/api/post', postRoutes);


module.exports = app;