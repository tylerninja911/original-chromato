const UserModel = require('../models/user');
const OrderModel = require('../models/orders');
const ProductModel = require('../models/product');
const checkPermissions = require('../utils/checkPermissions');
const { BadRequestError, NotFoundError } = require('../errors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)


const getAllOrders = async (req, res) => {
  const orders = await OrderModel.find({});
  
  res.status(200).json({ orders });
};

const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await OrderModel.find({ _id: orderId });
  checkPermissions(req.user, order.user);
  res.status(200).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const {fields=''} = req.query;
  let result =  OrderModel.find({ user: req.user.userId });

  let fieldList;
  if(fields){
    fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
}

  const orders = await result;


  res.status(200).json({ orders });
};

const createOrder = async (req, res) => {
  const { items: cartItems, shippingFee, id: paymentIntentId } = req.body;

  if (!cartItems?.length)
    throw new BadRequestError('Please provide cart items');

  if (shippingFee === undefined)
    throw new BadRequestError('Please provide shipping fee');

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await ProductModel.findOne({ _id: item._id });

    if (!dbProduct)
      throw new NotFoundError(`No product with id ${item.productId}`);

    const { name, price, image, _id, discount } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
      discount,
    };

    orderItems.push(singleOrderItem);
    subTotal += (price - discount) * item.amount;
  }

  const total = subTotal + shippingFee;
  let payment;
  // const {amount,id} = req.body;
  try {
    payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'INR',
      description: 'Chromato',
      payment_method: paymentIntentId,
      confirm: true,
    });
    // console.log("payment",payment)
    // res.json({
    //    message:"Payment Successfull",
    //     success:true
    // })
  } catch (error) {
    console.log('error', error);
    throw new Error('Payment failed')
    // res.json({
    //   message: 'Payment failed',
    //   success: false,
    // });
  }
  const order = await OrderModel.create({
    subTotal,
    total,
    orderItems,
    shippingFee,
    clientSecret: payment.client_secret,
    user:req.user.userId,
    paymentIntentId

  });
  res.status(201).json({ order });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const order = await OrderModel.findOneAndUpdate({ _id: orderId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
