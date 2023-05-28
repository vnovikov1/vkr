const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/charge', paymentController.charge);

module.exports = router;
