const db = require('../models');
const { Brand } = db;
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        const { name } = req.body;
        try {
            const brand = await Brand.create({ name });
            return res.status(201).json(brand);
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            return res.status(200).json(brands);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new BrandController();
