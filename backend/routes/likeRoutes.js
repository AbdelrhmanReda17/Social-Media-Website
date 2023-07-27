const express = require('express');
const {
    getLikes, 
    createLike, 
    deleteLike,
  } = require('../controllers/LikeController');
  
const router = express.Router()


// Get all a post likes
router.get('/:id',getLikes)

// Post a like
router.post('/',createLike)

// delete post
router.delete('/', deleteLike)

module.exports = router