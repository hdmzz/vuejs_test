const jwt = require('jsonwebtoken');
const db = require('../database/database');
const connection = db.databaseConnect();

module.exports = (req, res, next) => {
        //on récupère l'id present dans le token 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // on va récupérer l'userId présent dan sle post et le comparer à l'id du token 
        const postId = req.params.id;
        const sql = 'SELECT * FROM post INNER JOIN users ON post.user_id = users.id WHERE post.post_id = ?';
        connection.query(sql, postId, function(error, result){
            const user = result[0];
            console.log(user)
            if(user.user_id !== userId){
                console.log('utilisateur non authentifié')
                return res.status(401).json({message: 'non authorisé'}) 
            } else{
                console.log('utilisateur authentifié')
                next();
            }
        })
};