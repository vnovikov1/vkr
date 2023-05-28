const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const ApiError = require('../error/ApiError');

class PaymentController {
    async charge(req, res, next) {
        try {
            const {amount, token} = req.body;
            const charge = await stripe.charges.create({
                amount: amount * 100,
                currency: 'usd',
                source: token.id,
                description: `Charge for user ${req.user.email}`,
            });

            // можно сохранить данные о транзакции в базу данных

            return res.json(charge);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new PaymentController();
