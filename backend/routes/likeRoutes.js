const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const {
    getLikes, 
    createLike, 
    deleteLike,
  } = require('../controllers/LikeController');
  
const router = express.Router()

// Require Auth to get access to Post Routes
router.use(requireAuth);

// Get all a post likes
router.get('/:id',getLikes)

// Post a like
router.post('/',createLike)

// delete post
router.delete('/', deleteLike)

module.exports = router