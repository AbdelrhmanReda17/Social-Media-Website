const express = require('express');
const {
    getPosts, 
    getPost, 
    createPost, 
    deletePost,
    updatePost
  } = require('../controllers/PostController')
  
const router = express.Router()


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