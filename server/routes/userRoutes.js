const { loginController, registerController, addCoinController, removeCoinController, fetchCoinsController } = require('../controllers/UserRoutesController')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const route = require('express').Router()

route.post('/login', loginController)

route.post('/register', registerController)

route.get('/allcoins', isAuthenticated, fetchCoinsController)

route.put('/addcoin', isAuthenticated, addCoinController)

route.put('/removecoin', isAuthenticated, removeCoinController)

module.exports = route