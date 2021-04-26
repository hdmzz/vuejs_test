const express = require('express');
const router = express.Router();
const passwordValidator = require('../middleware/verifyPassword');

const testCtrl = require('../controllers/users');

router.post('/', passwordValidator, testCtrl.createUser);
router.post('/connexion', testCtrl.connexionUser)

module.exports = router;