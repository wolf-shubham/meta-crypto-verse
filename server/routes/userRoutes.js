const { loginController, registerController } = require('../controllers/UserRoutesController')

const route = require('express').Router()

route.post('/login', loginController)

route.post('/register', registerController)

module.exports = route