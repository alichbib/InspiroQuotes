const express = require('express')
const app = express()
const cors = require('cors')
const connectToDb = require('./config/db')
const nodemon = require('nodemon')
const usersRouter = require('./routes/users') 
const quotesRouter = require('./routes/quotes')

//middlewares:
app.use(express.json())
app.use(cors())

app.use('/auth', usersRouter)
app.use('/quotes', quotesRouter)

connectToDb()

app.listen(process.env.PORT, () => {
    console.log('server running on port 3001');
})
