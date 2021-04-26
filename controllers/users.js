const mysql = require('mysql');
const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
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
        const values = [[user.lastName, user.firstName, user.email, user.password]];
        const sql = `INSERT INTO users (lastName, firstName, email, password ) VALUES ?`;
        connection.query(sql, [values],function(err, result){
            if (err){
                return res.status(401).json(err)
            } else {
                console.log('table implémentée');
                console.log(result);
                return res.status(200).json({message: 'Utilisateur créé!'})
            }
            })
        })
    .catch(error => res.status(500).json({ error }));
};

exports.connexionUser = (req, res) => {
    const connection = db.databaseConnect();
    const email = req.body.email;
    console.log(email);
    const sql = 'SELECT * FROM users WHERE email= ?';
    connection.query(sql, email, function(error, user) {
        if(error) throw error;
        if (user == '') {
            return res.status(401).json({error: "utilisateur non enregistré"});
        }
        console.log("requete sql")
        const userPassword = user[0].password;
        //on compare les mot de passe avec bcrypt
        bcrypt.compare(req.body.password, userPassword)
        .then(valid => {
            if (!valid) {
                console.log('mot de passe ne correspond pas');
                return res.status(401).json({error: "Mot de passe incorrect! "});
            }
            res.status(200).json({
                userId: user[0].id,
                isadmin: user[0].isadmin,
                token: jwt.sign(
                    {userId: user[0].id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '8h'}
                )
            });
        })
        .catch(error => {
            return res.status(401).json(error)
        });
    })
}