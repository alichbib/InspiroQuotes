const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const quoteSchemaModel = mongoose.model('quotes', quoteSchema)
module.exports = quoteSchemaModel