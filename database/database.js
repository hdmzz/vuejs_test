const mysql = require('mysql');

exports.databaseConnect = () => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "groupomania"
        });
        return db;
}