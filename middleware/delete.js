const jwt = require('jsonwebtoken');
const db = require('../database/database');
const connection = db.databaseConnect();

exports.deletePostAuth = (req, res, next) => {
    try {
        //on récupère l'id present dans le token 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        // on va récupérer l'userId présent dans le post et le comparer à l'id du token 
        const postId = req.params.id;
        const sqlPost = 'SELECT * FROM post INNER JOIN users ON post.user_id = users.id WHERE post.post_id = ?';
        connection.query(sqlPost, postId, function(error, result){
            if (error) throw error;
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
    } catch (error) {
        console.log(error)
    }
};

exports.deleteCommentAuth = (req, res, next) => {
    try {
        //on récupère l'id present dans le token 
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        //Récupération de l'id present dans le commentaire et comparaison avec celui du token
        const commentId = req.params.id;
        console.log(commentId)
        const sqlComment ='SELECT * FROM comment INNER JOIN users ON comment.userId = users.id WHERE comment.commentId = ?';
        connection.query(sqlComment, commentId, function(error, result){
            if (error) throw error;
            const user = result[0];
            console.log(user)
            if(user.userId !== userId){
                console.log('utilisateur non authentifié')
                return res.status(401).json({message: 'non authorisé'}) 
            } else{
                console.log('utilisateur authentifié')
                next();
            }
        })
    } catch (error) {
        console.log(error)
    }
};