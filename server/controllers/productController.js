const uuid = require('uuid')
const path = require('path');
const { Op } = require("sequelize");

const { Product, ProductInfo } = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {

    async create(req, res, next) {
        try {
            let { name, price, imageUrl, description, categoryId, info } = req.body;
            if (!name || !price || !imageUrl || !description || !categoryId || !info) {
                throw new ApiError.BadRequest("Invalid Parameters");
            }

            let fileName = uuid.v4() + ".jpg";
            imageUrl.mv(path.resolve(__dirname, '..', 'static', fileName));

            const product = await Product.create({ name, price, imageUrl: fileName, description, categoryId });

            info = JSON.parse(info);
            info.forEach(i => ProductInfo.create({
                title: i.title,
                description: i.description,
                productId: product.id
            }));

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { categoryId, search, limit = 9, page = 1 } = req.query;
            const offset = (page - 1) * limit;
            const whereClause = {};

            if (search) {
                whereClause.name = { [Op.iLike]: `%${search}%` };
            }

            if (categoryId) {
                whereClause.categoryId = categoryId;
            }

            const products = await Product.findAndCountAll({
                where: whereClause,
                include: [{ model: ProductInfo, as: 'info' }],
                limit,
                offset,
            });

            return res.json(products);
        } catch (err) {
            next(ApiError.internal(err));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            });
            if (!product) {
                throw new ApiError.NotFound("Product Not Found");
            }
            return res.json(product);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController()