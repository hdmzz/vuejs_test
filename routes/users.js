const express = require('express');
const router = express.Router();
//Valide le modèle d'entrées utilisateur 
const validate = require('../middleware/validateInputs');
//Entrave attaque par force brute
const limiter = require('../middleware/limiterConfig');

const usersCtrl = require('../controllers/users');

router.post('/', validate.newUser, usersCtrl.createUser);
router.post('/connexion', limiter.limiterConfig, usersCtrl.connexionUser)

module.exports = router;