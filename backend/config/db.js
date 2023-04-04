const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
        })
        console.log('Connected to MongoDB database!')
    } catch (error) {
        console.error('Error connecting to MongoDB database',error);
    }
}

module.exports = connectToDb