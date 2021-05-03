const express = require('express');
const router = express.Router();
//Valide le modèle de mot de passe 
const passwordValidator = require('../middleware/verifyPassword');
//Entrave attaque par force brute
const limiter = require('../middleware/limiterConfig');

const usersCtrl = require('../controllers/users');

router.post('/', /* passwordValidator, */ usersCtrl.createUser);
router.post('/connexion', limiter.limiterConfig, usersCtrl.connexionUser)

module.exports = router;