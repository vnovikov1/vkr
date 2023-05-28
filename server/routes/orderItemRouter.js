const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

router.post('/', orderItemController.create);
router.get('/', orderItemController.getAll);
router.get('/:id', orderItemController.getOne);

module.exports = router;
