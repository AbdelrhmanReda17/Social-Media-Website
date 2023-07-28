const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router()

const {
    getPosts, 
    getPost, 
    createPost, 
    deletePost,
    updatePost
  } = require('../controllers/postController');
// Require Auth to get access to Post Routes
router.use(requireAuth);

// Get all posts
router.get('/',getPosts)

// Get a single posts
router.get('/:id', getPost)

// Post a single posts
router.post('/',createPost )

// Update post
router.patch('/:id', updatePost)

// delete post
router.delete('/:id', deletePost)

module.exports = router