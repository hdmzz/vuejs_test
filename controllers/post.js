const fs = require('fs');
const mysql = require('mysql');
const db = require('../database/database');
const connection = db.databaseConnect();

exports.createPost = (req, res) => {
    try{
        // Récupération de l'url de l'image
        let imageUrl;
        if(req.file){
            imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        } else {
            imageUrl = null;
        }
        const userId = req.body.userId;
        const comment = req.body.comment;
        if(comment == null  && imageUrl == null){
            return res.status(400).json({message: 'Il faut remplir au moins un champ'})
        }
        console.log(imageUrl)
        const sql = 'INSERT INTO post (user_id, comment, imageurl) VALUES ?';
        const values = [[userId, comment, imageUrl]]
        connection.query( sql, [values], function(err, result){
            if (err) throw err;
            console.log(result);
            return res.status(200).json({message: 'Post créé'})
        });
    }
    catch(err){
        res.status(400).json({err})
    }
};

exports.getPosts = (req, res) => {
    try{
        const token = req.headers.authorization;
        console.log('getPosts CTRL',token);
        console.log(process.env.DATABASE_PASSWORD + ' process env')

        // On récupère les posts de
        connection.query(`SELECT lastName, firstName, comment, imageurl, post_date, post_id, id FROM users INNER JOIN post ON users.id = post.user_id ORDER BY post_id DESC`, function(err, result){
            if (err) throw err;
            console.log('Posts récupérés');
            return res.status(200).json(result);
        })
    } catch(err){
        res.status(400).json({err})
    }
};

exports.deletePost = (req, res) => {
    try {
        const postId = req.params.id;
        const sqlGet = 'SELECT imageurl FROM post WHERE post_id = ?';
        const sqlDlt = 'DELETE FROM post WHERE post_id = ?';
        connection.query(sqlGet, postId, function(err, result){
            if(err)console.log(err);
            const fileUrl = result[0].imageurl;
            if(fileUrl == null){
                console.log('pas dimage à suppr')
                deleteOne()
            } else if(fileUrl !== null){
                console.log('suppression image')
                const imageUrl = result[0].imageurl.split('/images/')[1]
                fs.unlink(`images/${imageUrl}`, () => {
                    deleteOne()
                })
            }
        })
        const deleteOne = () => {
            connection.query(sqlDlt, postId, function(err, result){
                if(err) throw err;
                return res.status(200).json({message: 'Post supprimé'});
            })
        }
    } catch(err){
        res.status(400).json({err})
    } 
};

exports.getOnePost = (req, res) => {
    try{
        const postId = req.params.id;
        console.log('recuperation dun seul post' + postId)
        const sql = "SELECT users.firstName, users.lastName, post.comment, post.imageurl FROM `post` INNER JOIN users ON post.user_id = users.id WHERE post.post_id = ?"
        connection.query(sql, postId, function(err, result){
            if(err) throw err;
            return res.status(200).json({result});
        })
    } catch(err){
        res.status(400).json({err})
    }
}