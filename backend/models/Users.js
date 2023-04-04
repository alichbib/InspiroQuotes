const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedQuotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "quotes" }]
})

const userSchemaModel = mongoose.model('users', userSchema)
module.exports = userSchemaModel