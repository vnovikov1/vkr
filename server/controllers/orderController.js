const ApiError = require('../error/ApiError');
const Order = require('../models/Order');

class OrderController {
  async create(req, res, next) {
    try {
      const { userId, productId } = req.body;
      const order = await Order.create({ user: userId, product: productId });
      return res.json(order);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders = await Order.find();
      return res.json(orders);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
      if (!order) {
        return next(ApiError.notFound(`Order with id ${id} was not found`));
      }
      return res.json(order);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new OrderController();
