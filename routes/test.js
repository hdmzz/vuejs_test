const express = require('express');
const router = express.Router();

const testCtrl = require('../controllers/test');

router.post('/', testCtrl.createTest);
router.get('/', testCtrl.getThing);
router.post('/connexionTest', testCtrl.connexionTest)

module.exports = router;