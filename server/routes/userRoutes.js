const { loginController, registerController, addCoinController, removeCoinController } = require('../controllers/UserRoutesController')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/login', loginController)

route.post('/register', registerController)

route.put('/addcoin', isAuthenticated, addCoinController)

route.put('/removecoin', isAuthenticated, removeCoinController)

module.exports = route