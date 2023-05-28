const Router = require('express').Router;
const favoritesController = require('../controllers/favoritesController');

const router = new Router();

// Роут для добавления продукта в список избранного пользователя
router.post('/', favoritesController.addFavorite);

// Роут для получения списка избранных продуктов пользователя
router.get('/:userId', favoritesController.getFavorites);

// Роут для удаления продукта из списка избранного пользователя
router.delete('/:userId/:productId', favoritesController.removeFavorite);

module.exports = router;
