const mysql = require('mysql');
const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createTest = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        }
        return user 
    })
    .then(user => {
        const connection = db.databaseConnect();
        connection.connect(function(err) {
        if (err) throw err;
        console.log('Connecté à la base de données')
    })
    const values = [[0, user.lastName, user.firstName, user.email, user.password]];
    const sql = `INSERT INTO users VALUES ?`;
    connection.query(sql, [values],function(err, result){
        if (err) throw err;
        console.log('table implémentée')
        return res.status(200).json({message: 'Utilisateur créé!'})
        })
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getThing = (req, res, next) => {
    const sql = "SELECT * FROM users WHERE email='azerty@mail.com'"; 
    const connection = db.databaseConnect();
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connecté à la base de données')
    })
    connection.query(sql, function(error, result) {
        if (error) throw error;
        return res.status(200).json(result);
    })
};

exports.connexionTest = (req, res) => {
    const connection = db.databaseConnect();
    const email = req.body.email;
    console.log(email);
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connecté à la base de données')
    })
    connection.query(sql, function(error, user) {
        if (error) throw error;
        const userPassword = user[0].password;
        console.log('REGARDE ICI');
        console.log(userPassword);
        //on compare les mot de passe avec bcrypt
        bcrypt.compare(req.body.password, userPassword)
        .then(valid => {
            if (!valid) {
                console.log('mot de passe ne correspond pas');
                return res.status(401).json({error: "Mot de passe incorrect!"});
            }
            res.status(200).json({
                userId: user[0].id,
                token: jwt.sign(
                    {userId: user[0].id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '8h'}
                )
            });
        })
        .catch(error => console.log(error));
    })
}