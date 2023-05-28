const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');

router.post('/:id/add', basketController.addItem);
router.get('/:id/items', basketController.getItems);
router.delete('/items/:itemId', basketController.removeItem);
router.delete('/:id/clear', basketController.clearBasket);

module.exports = router;