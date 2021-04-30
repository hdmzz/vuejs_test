const db = require('../database/database');
const connection = db.databaseConnect();

exports.createComment = (req, res) => {
    const userId = req.body.userId;
    const comment = req.body.comment;
    const postId = req.body.postId;
    console.log(req.body)
    const values = [[postId, userId, comment]]
    const sql = "INSERT INTO comment (postId, userId, comment) VALUES ?"
    connection.query(sql, [values], function(err, result){
        if(err){
            throw err
        }
        console.log('commentaire ajouté' )
        return res.status(200).json({message: 'commentaire ajouté'})
    })
};

exports.getComments = (req, res) => {
    const postId = req.params.id;
    console.log(postId)
    const values = [[postId]];
    const sql = 'SELECT commentId, postId, userId, comment, date, users.firstName, users.lastName FROM comment INNER JOIN users ON comment.userId = users.id WHERE comment.postId = ? ORDER BY commentId DESC'
    connection.query(sql, [values], function(err, result){
        if(err){
            console.log(err)
        }
        return res.status(200).json({result})
    })
};

exports.deleteComment = (req, res) => {
    try {
        const commentId = req.params.id;
        const sqlDlt = 'DELETE FROM comment WHERE commentId = ?';
            connection.query(sqlDlt, commentId, function(err, result){
                if(err) throw err;
                console.log(result +' ' + 'delete comment');
                return res.status(200).json({message: 'Post supprimé'});
            })
    } catch(err){
        res.status(400).json({err})
    } 
};