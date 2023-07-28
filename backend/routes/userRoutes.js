const express = require('express');
const {
    loginUser, 
    registerUser,
    getUser, 
} = require('../controllers/userController');

const router = express.Router()


router.post('/login/', loginUser);

router.get('/:id' , getUser);

router.post('/register/',registerUser);



module.exports = router