const User = require("../models/userModel");
const mongoose = require("mongoose");
const JWT = require ("jsonwebtoken");


const createToken = (_id , username ) =>{
    return JWT.sign({_id , username} , process.env.SECRET , {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.signin(email, password) ;
        const token = createToken(user._id , user.username);
        res.status(200).json({token , username: user.username , _id : user._id})

    }catch(e){
        res.status(400).json({error : e.message })
    }
};


const registerUser = async (req, res) => {
    const { email, password , username , photoURL } = req.body;
    try{
        // Create User object
        const user = await User.signup(email, password , username , photoURL ) ;
        // Create Token
        const token = createToken(user._id , user.username);
        res.status(200).json({token , username  , _id : user._id})
    }catch(e){
        res.status(400).json({error : e.message })
    }
    
};

const getUser = async (req, res) =>{
        try{
            const user = await User.findOne({_id : req.params.id});
            res.status(200).json({ user })
        }catch(e){
            res.status(400).json({error : e.message })
        }

}

module.exports = {
    loginUser, registerUser , getUser
}