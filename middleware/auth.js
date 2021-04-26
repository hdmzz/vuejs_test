const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        console.log('req headers')
        console.log(req.body.userId, 'recup du corps de la requete')
        console.log(userId, 'recup des headers')
        if (req.body.userId && req.body.userId != userId) {
            throw 'Invalid user ID';
        } else {
            console.log('auth validé')
            next();
        }
    } catch {
        res.status(401).json({message: 'token invalide'});
    }
};