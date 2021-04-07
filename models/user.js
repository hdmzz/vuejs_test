const Sequelize = require("sequelize");
const sequelize = require("./db.js");

//modèle
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
        },
    )
};