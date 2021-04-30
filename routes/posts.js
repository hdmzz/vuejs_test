const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const dlt = require('../middleware/delete');
const multer = require('../middleware/multerconfig');

router.get('/getPosts', auth, postCtrl.getPosts);
router.post('/createPost', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, dlt.deletePostAuth, postCtrl.deletePost);
router.get('/getOnePost/:id', auth, postCtrl.getOnePost);

module.exports = router;