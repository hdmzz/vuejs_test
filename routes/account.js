const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const accountCtrl = require('../controllers/account');

router.get('/:id', auth, accountCtrl.getAccountInfo);
router.delete('/:id', auth, accountCtrl.deleteAccount);

module.exports = router;