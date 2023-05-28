const ApiError = require('../error/ApiError');
const {Basket, BasketItem} = require('../models/models');

class BasketController {
    async addItem(req, res, next) {
        try {
            const {productId, quantity} = req.body;
            const basketId = req.params.id;

            // находим корзину товаров пользователя
            let basket = await Basket.findOne({where: {id: basketId}});
            if (!basket) {
                // если корзины нет, создаем новую
                basket = await Basket.create({});
                await basket.setUser(req.user.id);
            }

            // проверяем, есть ли уже такой товар в корзине
            let basketItem = await BasketItem.findOne({
                where: {
                    basketId: basket.id,
                    productId,
                },
            });
            if (basketItem) {
                // если есть, увеличиваем количество товара
                basketItem.quantity += quantity;
                await basketItem.save();
            } else {
                // добавляем новый товар в корзину
                basketItem = await BasketItem.create({
                    basketId: basket.id,
                    productId,
                    quantity,
                });
            }

            // возвращаем список товаров в корзине
            const items = await BasketItem.findAll({
                where: {basketId: basket.id},
                include: [{all: true}],
            });
            return res.json(items);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getItems(req, res, next) {
        try {
            const basketId = req.params.id;
            const items = await BasketItem.findAll({
                where: {basketId},
                include: [{all: true}],
            });
            return res.json(items);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async removeItem(req, res, next) {
        try {
            const itemId = req.params.itemId;
            const item = await BasketItem.findOne({where: {id: itemId}});
            if (!item) {
                throw ApiError.badRequest(`Item with id ${itemId} does not exist`);
            }
            await item.destroy();
            return res.json("Item removed from basket");
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async clearBasket(req, res, next) {
        try {
            const basketId = req.params.id;
            const items = await BasketItem.findAll({where: {basketId}});
            items.forEach(async (item) => await item.destroy());
            return res.json("Basket cleared");
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new BasketController();
