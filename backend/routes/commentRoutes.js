const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router()
const {
    getComments, 
    createComment, 
    deleteComment,
  } = require('../controllers/commentController');
  

router.use(requireAuth);

router.get('/:id',getComments)

router.post('/',createComment)

router.delete('/', deleteComment)


module.exports = router