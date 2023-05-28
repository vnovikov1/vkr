const ApiError = require('../error/ApiError');
const { Favorite } = require('../models/models');

class FavoritesController {
  async addFavorite(req, res, next) {
    try {
      const { userId, productId } = req.body;

      // Проверяем, был ли уже добавлен этот продукт в избранное пользователем
      const favorite = await Favorite.findOne({
        where: { userId, productId },
      });
      if (favorite) {
        throw ApiError.badRequest(`Product with ID ${productId} is already in user's favorites`);
      }

      // Если продукт еще не был добавлен в избранное, создаем запись об этом
      const newFavorite = await Favorite.create({ userId, productId });

      return res.json(newFavorite);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async getFavorites(req, res, next) {
    try {
      const userId = req.params.userId;

      // Ищем все записи в таблице избранного для пользователя с данным ID
      const favorites = await Favorite.findAll({ where: { userId } });

      return res.json(favorites);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }

  async removeFavorite(req, res, next) {
    try {
      const { userId, productId } = req.params;

      // Ищем запись об избранном продукте с данными параметрами
      const favorite = await Favorite.findOne({ where: { userId, productId } });
      if (!favorite) {
        throw ApiError.badRequest(`Product with ID ${productId} is not in user's favorites list`);
      }

      // Если такая запись есть, удаляем ее
      await favorite.destroy();

      return res.json('Product was successfully removed from favorites');
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

module.exports = new FavoritesController();
