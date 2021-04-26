const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminDlt = require('../middleware/adminDelete');
const postCtrl = require('../controllers/post');

router.delete('/:id', auth, adminDlt, postCtrl.deletePost);

module.exports = router; 