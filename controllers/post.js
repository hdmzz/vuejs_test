const mysql = require('mysql');
const db = require('../database/database');
const connection = db.databaseConnect();

exports.createPost = (req, res) => {
        const userId = req.body.userId;
        const comment = req.body.comment;
        connection.connect(function(err) {
            if (err) throw err;
            console.log('Connecté à la base de données')
        })
        /* const values = [[0, userId, comment, 'NOW()']] */
       /*  const sql = `INSERT INTO commentpost ('post_id', 'user_id', 'comment') VALUES ((), '${userId}', '${comment}')` */
        connection.query(`INSERT INTO commentpost VALUES (0, '${userId}', '${comment}', NOW())`, function(err, result){
            if (err) throw err;
            console.log('table implémentée');
            return res.status(200).json({message: 'Utilisateur créé!'})
            });
    
};

exports.getPosts = (req, res) => {
    const token = req.headers.authorization;
    console.log('getPosts CTRL',token);
    // On rcupère les posts de
    connection.query(`SELECT lastName, firstName, comment, post_date FROM users INNER JOIN commentpost ON users.id = commentpost.user_id`, function(err, result){
        if (err) throw err;
        console.log('Posts récupérés');
    return res.status(200).json(result);
})}