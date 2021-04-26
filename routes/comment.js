const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');
const dlt = require('../middleware/delete');

router.post('/createComment', auth, commentCtrl.createComment);
router.get('/getComments/:id', auth, commentCtrl.getComments);


module.exports = router;