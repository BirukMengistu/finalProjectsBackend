const router = require('express').Router();
const orderModel = require('../models/order/orderModel');
const auth = require('../authentication/auth');

// Get all products
router.get('/', orderModel.getOrders);

//Get one product by id
router.get('/:id', orderModel.getOrderById);

//create new product
router.post('/', auth.verifyToken, orderModel.createOrder);

// Update product
router.patch('/:id', auth.verifyToken, orderModel .updateOrder);
router.put('/:id', auth.verifyToken, orderModel.updateOrder);

//Delete product
router.delete('/:id', auth.verifyToken, orderModel.deleteProduct);


module.exports = router;