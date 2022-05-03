const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./database/dbConnection')
const userRoutes = require('./routes/userRoutes')
const path = require('path')


dotenv.config()
const app = express()
app.use(express.json())
connectDB()
const PORT = process.env.PORT || 5000

app.use('/user', userRoutes)

//-----------------Deployment-----------------
const __dirname1 = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}
//-----------------Deployment-----------------


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})
