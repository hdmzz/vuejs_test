const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/getPosts', auth, postCtrl.getPosts);
router.post('/createPost', auth, postCtrl.createPost)

module.exports = router;