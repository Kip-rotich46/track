const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = '';

//Register a user
router.post('/register', async(req, res) =>{
    const {name, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({mame,email,password: hashedPassword});
        await newUser.save();

        res.status(201).json({message: 'User has been registered successfully'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Login a user
router.get('/login', async(req, res) =>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400),json({message: 'Invalid credentials'});

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1h'});
        res.json({ token, userId: user._id, name: user.name});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;