const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


// @desc  Rergister new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, address} = req.body
    if(!name || !email || !password || !address){
        res.status(400)
        throw new Error('All fields are required')
    }

    //Check if user exist
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user.id)
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc  Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    //Check for user emal
    const user = await User.findOne({email})
    //Check password
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    } 
})

// @desc  Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email, address} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        address,
    })
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}