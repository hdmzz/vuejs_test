const mysql = require('mysql');
const db = require('../database/database');

exports.createTest = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const price = req.body.price;
    const color = req.body.color;

    const connection = db.databaseConnect();
    
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connécté à la base de données')
    })
    const sql = 'INSERT INTO thing VALUES ?';
    const values = [[firstName, lastName, price, color]];

    connection.query(sql, [values], function(err, result){
        if (err) throw err;
        console.log('table implémentée')
    });
    

};

exports.getThing = (req, res, next) => {
    const sql = 'SELECT * FROM thing'; 
    const connection = db.databaseConnect();
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connécté à la base de données')
    })
    connection.query(sql, function(error, result) {
        if (error) throw error;
        return res.status(200).json(result);
    })


};