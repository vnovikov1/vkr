const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: Sequelize.STRING, unique: true,},
    password: {type: Sequelize.STRING},
    username: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    address: {type: Sequelize.STRING},
    phone_number: {type: Sequelize.STRING},
});

const UserRole = sequelize.define('user_role', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    role_name: {type: Sequelize.STRING},
});

const Product = sequelize.define('product', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
    img: {type: Sequelize.STRING},
});

const Brand = sequelize.define('brand', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
});

const Type = sequelize.define('type', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING},
});

const ProductInfo = sequelize.define('product_info', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: Sequelize.STRING},
    description: {type: Sequelize.STRING},
});

const Basket = sequelize.define('basket', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const OrderItem = sequelize.define('order_item', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: Sequelize.INTEGER},
    price: {type: Sequelize.INTEGER},
});

const Order = sequelize.define('order', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    order_date: {type: Sequelize.DATE},
    total_amount: {type: Sequelize.INTEGER},
});

const Favorite = sequelize.define('favorite', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

const Rating = sequelize.define('rating', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    rating: {type: Sequelize.INTEGER},
});

const Payment = sequelize.define('payment', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    payment_method: {type: Sequelize.STRING},
    amount: {type: Sequelize.INTEGER},
});

const BasketItem = sequelize.define('basket_item', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

User.belongsTo(UserRole);
UserRole.hasMany(User);

Product.belongsTo(Brand);
Brand.hasMany(Product);

Product.belongsTo(Type);
Type.hasMany(Product);

Product.hasMany(ProductInfo);
ProductInfo.belongsTo(Product);

Basket.belongsTo(User);
User.hasMany(Basket);

Order.belongsTo(User);
User.hasMany(Order);

Payment.belongsTo(Order);
Order.hasMany(Payment);

Favorite.belongsTo(User);
User.hasMany(Favorite);

Favorite.belongsTo(Product);
Product.hasMany(Favorite);

Rating.belongsTo(User);
User.hasMany(Rating);

Rating.belongsTo(Product);
Product.hasMany(Rating);

OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

BasketItem.belongsTo(Product);
Product.hasMany(BasketItem);

BasketItem.belongsTo(Basket);
Basket.hasMany(BasketItem);

module.exports = {
    User,
    UserRole,
    Product,
    Brand,
    Type,
    ProductInfo,
    Basket,
    OrderItem,
    Order,
    Favorite,
    Rating,
    Payment,
    BasketItem
};