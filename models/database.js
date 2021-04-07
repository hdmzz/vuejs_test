const Sequelize = require('sequelize');
const dbConfig = require('../database/database');
//init de Sequelize

const config = {
    username: dbConfig.user,
    host: dbConfig.host,
    password: dbConfig.password,
    database: dbConfig.database,
    dialect: 'mysql'
};

const sequelize = new Sequelize(config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);

module.exports = db;


