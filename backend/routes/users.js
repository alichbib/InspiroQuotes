const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  userSchemaModel = require('../models/Users')

router.post('/registre', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userSchemaModel.findOne({ username: username })
        if(user) {
            return res.json('user already in use !!!')
        }
        
        const hash = await bcrypt.hash(password, 10)
        const newUser = await userSchemaModel.create({
            username,
            password: hash
        })
        res.status(200).json('user created')
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userSchemaModel.findOne({ username: username })
        if(!user) {
            return res.json({ message: `user doesn't exist !!! `})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.json({ message: `password or username is incorrect !!!` })
        }
        const token = jwt.sign({ id: user._id }, "secret")
        res.status(200).json({ token, userID: user._id })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if(err) return res.sendStatus(403)
            next()
        })
    } else {
        res.sendStatus(401) 
    }
}

module.exports = verifyToken