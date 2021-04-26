const db = require('../database/database');
const connection = db.databaseConnect();

exports.getAccountInfo = (req, res) => {
    //requete sql pour récupérer les information de la table users
    const userId = JSON.parse(req.params.id);
    console.log(userId);
    const sql = 'SELECT * FROM users WHERE id= ?'
    connection.query( sql, userId, function(err, result){
        if (err) throw err;
        console.log(result)
        return res.status(200).json({result})
        })
};

exports.deleteAccount = (req, res) => {
    const id = JSON.parse(req.params.id);
    const sql = 'DELETE FROM users WHERE users.id = ?';
    connection.query(sql, id, function(err, result){
        if (err) throw err;
        console.log(result)
        return res.status(200).json({message: 'Le compte et les publications associées ont étés supprimé'})
    })

}; 