const jwt = require('jsonwebtoken');
const db = require('../database/database');
const connection = db.databaseConnect();

module.exports = (req, res, next) => {
        //on récupère l'id present dans le token 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // Vérification du role administrateur de l'utilisateur
        const sql = 'SELECT * FROM users WHERE id = ?';
        connection.query(sql, userId, function(error, result){
            const user = result[0];
            console.log(user)
            if(user.isadmin == 1){
                console.log('next admin is here')
                next();
            } else {
                console.log("'l'utilisateur n'est pas adminstrateur'")
                return res.status(401).json({message: 'non authorisé'})
            }
        })
};