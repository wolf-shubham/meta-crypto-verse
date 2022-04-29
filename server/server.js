const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const dbConnection = require('./database/dbConnection')
const userRoutes = require('./routes/userRoutes')


dotenv.config({ path: '../.env' })
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000

dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
