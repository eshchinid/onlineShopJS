const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Account, Basket} = require('../models/models')

class AccountController {
    async registration (req, res, next) {
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await Account.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('такой email уже есть'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Account.create({email, role, password: hashPassword})
        const basket =await Basket.create({userId: user.id})
        const token = jwt.sign(
            {id: user.id, email, role},
            process.env.SECRET_KEY,
            {expiresIn:'24h'}
        )
        return res.json({token})
        }

    async login (req, res) {

    }

    async check (req, res, next) {
        const {id} =req.query
        if (!id) {
           return next(ApiError.badRequest('не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new AccountController()