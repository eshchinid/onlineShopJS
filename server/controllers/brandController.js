const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')


class BrandController {
    async create (req, res) {
        const{name} = req.body
        const brand = await Brand.create({name})
        res.json(brand)
    }

    async getAll (req, res) {
        const brand = await Brand.findAll()
        return res.body(brand)
    }

}

module.exports = new BrandController()