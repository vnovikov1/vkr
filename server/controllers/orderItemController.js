const ApiError = require('../error/ApiError');
const OrderItem = require('../models/OrderItem');

class OrderItemController {
  async create(req, res, next) {
    try {
      const { orderId, productId, quantity } = req.body;
      const order_item = await OrderItem.create({ order_id: orderId, product_id: productId, quantity });
      return res.json(order_item);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const orders_items = await OrderItem.find();
      return res.json(orders_items);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const order_item = await OrderItem.findById(id);
      if (!order_item) {
        return next(ApiError.notFound(`Не найден товар с таким id ${id}`));
      }
      return res.json(order_item);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
}

module.exports = new OrderItemController();
