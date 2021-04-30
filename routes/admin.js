const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminDlt = require('../middleware/adminDelete');
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');

router.delete('/:id', auth, adminDlt, postCtrl.deletePost);
router.delete('/comment/:id', auth, adminDlt, commentCtrl.deleteComment);

module.exports = router; 