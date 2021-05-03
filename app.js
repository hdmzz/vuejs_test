//Dotenv config pour les données sensibles
require('dotenv').config();
const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const accountRoutes = require('./routes/account');
const adminRoutes = require('./routes/admin');
const commentRoutes = require('./routes/comment'); 

const path = require('path');

const helmet = require('helmet');
const xss = require('xss-clean');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//gestion des images
app.use("/images", express.static(path.join(__dirname, "images")));

//Protection des headers avec helmet et protection contre les XSS
app.use(helmet());
app.use(xss());



//Routes
app.use('/api/users', usersRoutes);
app.use('/api/post', postRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);


module.exports = app;