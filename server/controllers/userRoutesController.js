const bcrypt = require('bcrypt')
const generateToken = require('../config/generateToken')
const User = require('../models/userModel')


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            name,
            email,
            password: hashPassword
        })
        await newUser.save()
        const token = generateToken(newUser._id)
        return res.status(200).json({ token, user: newUser, message: 'Registration Successful' })
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(404).json({ message: 'invalid email or password.' })
        }
        const token = generateToken(user._id)
        return res.status(200).json({ token, user, message: 'Login Successful' })
    } catch (error) {
        console.log(error)
    }
}

const fetchCoins = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const coins = user.coin
        return res.status(200).json(coins)
    } catch (error) {
        console.log(error)
    }
}


const addCoin = async (req, res) => {
    try {
        const { coin } = req.body
        const user = await User.findById(req.user._id).select('-password')
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        if (user.coin.includes(coin)) {
            return res.status(400).json({
                message: 'Coin already added'
            })
        }
        user.coin.push(coin)
        await user.save()
        return res.status(200).json({ user, message: 'Coin added successfully' })
    } catch (error) {
        console.log(error)
    }
}


const removeCoin = async (req, res) => {
    try {
        const { coin } = req.body
        const user = await User.findById(req.user._id).select('-password')
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
        if (!user.coin.includes(coin)) {
            return res.status(400).json({
                message: 'Coin not found'
            })
        }
        user.coin.splice(user.coin.indexOf(coin), 1)
        await user.save()
        return res.status(200).json({ user, message: 'Coin removed successfully' })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    loginController: login,
    registerController: register,
    addCoinController: addCoin,
    removeCoinController: removeCoin,
    fetchCoinsController: fetchCoins
}