const express = require('express');
const { getAllOrders, getSingleOrder, updateOrder, getCurrentUserOrders, createOrder } = require('../controllers/orderController');
const { authorizePermissions } = require('../middleware/authentication');
const OrderModel = require('../models/orders');

const router = express.Router();

router.route('/').get(authorizePermissions('admin'), getAllOrders).post(createOrder);
router.route('/showAllMyOrders').get(getCurrentUserOrders);
router.route('/:id').get(getSingleOrder).patch(updateOrder).delete(async (req, res) => {
    const {id} = req.params;
    await OrderModel.deleteOne({_id:id})
});

module.exports = router;