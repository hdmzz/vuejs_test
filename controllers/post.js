const { json } = require('body-parser');
const mysql = require('mysql');
const db = require('../database/database');
const connection = db.databaseConnect();

exports.createPost = (req, res) => {
    // Récupération de l'url de l'image
    let imageUrl;
    if(req.file){
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    } else {
        imageUrl = null;
    }
    const userId = req.body.userId;
    const comment = req.body.comment;
    console.log(imageUrl)
    const sql = 'INSERT INTO post (user_id, comment, imageurl) VALUES ?';
    const values = [[userId, comment, imageUrl]]
    connection.query( sql, [values], function(err, result){
        if (err) throw err;
        console.log(result);
        return res.status(200).json({message: ''})
    }); 
    
};

exports.getPosts = (req, res) => {
    const token = req.headers.authorization;
    console.log('getPosts CTRL',token);
    // On rcupère les posts de
    connection.query(`SELECT lastName, firstName, comment, imageurl, post_date, post_id, id FROM users INNER JOIN post ON users.id = post.user_id ORDER BY post_id DESC`, function(err, result){
        if (err) throw err;
        console.log('Posts récupérés');
    return res.status(200).json(result);
})};

exports.deletePost = (req, res) => {
    const postId = req.params.id;
    const sql = 'DELETE FROM post WHERE post_id = ?';
    connection.query(sql, postId, function(err, result){
        if(err) throw err;
        return res.status(200).json({message: 'Post supprimé'});
    })
};

exports.getOnePost = (req, res) => {
    const postId = req.params.id;
    console.log('recuperation dun seul post' + postId)
    const sql = "SELECT users.firstName, users.lastName, post.comment, post.imageurl FROM `post` INNER JOIN users ON post.user_id = users.id WHERE post.post_id = ?"
    connection.query(sql, postId, function(err, result){
        if(err) throw err;
        return res.status(200).json({result});
    })
}