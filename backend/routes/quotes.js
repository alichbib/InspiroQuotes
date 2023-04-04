const express = require('express')
const router = express.Router()
const quoteSchemaModel = require('../models/Quotes')
const userSchemaModel = require('../models/Users')
const verifyToken = require('./users')

router.get('/getQuotes', async (req, res) => {
    try{
        const quotes = await quoteSchemaModel.find({})
        res.json(quotes)
    } catch(error) {
        console.log(error);
    }
})

router.post('/addQuote', verifyToken, async (req, res) => {
    const {quote, author, userOwner} = req.body
    
    try{
        const quotes = await quoteSchemaModel.create({
            quote, 
            author,
            userOwner
        })
        //or
        //const quotes = await quoteSchemaModel.create(req.body)
        res.json(quotes)
    } catch(error) {
        console.log(error);
    }
})

router.put('/', verifyToken, async (req, res) => {
    const { quoteID, userID } = req.body
    try {
        const quote = await quoteSchemaModel.findById(quoteID)
        const user = await userSchemaModel.findById(userID)
        user.savedQuotes.push(quote)
        await user.save()
        res.json({ savedQuotes: user.savedQuotes })
    } catch (error) {
        console.log(error);
    }
})

router.get('/savedQuotesIds/:id', async(req, res) => {
    try {
        const user = await userSchemaModel.findById(req.params.id)
        res.json({ savedQuotes: user.savedQuotes })
    } catch(error) {
        console.log(error);
    }
})

router.get('/savedQuotes/:id', async(req, res) => {
    const id = req.params.id
    try {
        const user = await userSchemaModel.findById(id)
        const savedQuotes = await quoteSchemaModel.find({
            _id: {  $in: user.savedQuotes }
        })
        res.json({ savedQuotes })
    } catch(error) {
        console.log(error);
    }
})

module.exports = router