const db = require('../database/database');
const connection = db.databaseConnect();

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const sql = 'DELETE FROM post WHERE post_id = ?';
    connection.query(sql, postId, function(err, result){
        if (err){
            res.status(401).json(err)
        };
        console.log(result)
        res.status(200).json({message: 'Post supprimé'})
    })
};