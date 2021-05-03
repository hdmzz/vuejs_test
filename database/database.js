const mysql = require('mysql');

exports.databaseConnect = () => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: process.env.DATABASE_PASSWORD,
        database: "groupomania"
        });
        return db
}