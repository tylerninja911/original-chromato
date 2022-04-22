require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/productRoute');
const reviewRouter = require('./routes/reviewRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const cloudinary = require('cloudinary').v2;
const {
  authenticateUser,
  authorizePermissions,
} = require('./middleware/authentication');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

const OrderModel = require('./models/orders');
const ReviewModel = require('./models/review');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/orders', authenticateUser, orderRouter);

const getFormattedDate = (dateObj) => {
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};

app.use(
  cors({
    origin: '*',
  })
);

app.get('/api/v1/dashboard',[authenticateUser, authorizePermissions('admin')],
    async (req, res) => {
    let date = new Date();
    date.setDate(date.getDate() - 30);

    let _30Daysback = getFormattedDate(date);
    console.log(_30Daysback);

    const data = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date(_30Daysback) },
        },
      },

      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$total' },
          totalCount: { $sum: 1 },
          user: { $addToSet: '$user' },
        },
      },

      {
        $project: {
          _id: 0,
          totalAmount: 1,
          totalCount: 1,
          totalUniqueCustomers: { $size: '$user' },
          averageCustomerSpend: {
            $round:{
            $divide: ['$totalAmount', { $size: '$user' }]
            }
          },
        },
      },
    ]);

    const salesData = await OrderModel.aggregate([
      { $match: { createdAt: { $gt: new Date(_30Daysback) } } },
      {
        $project: {
          //don't remove these comments
          // createdAt:{$substr:["$createdAt", 0, 10]},
          // createdAt:{$substr:["$createdAt", 0, {$indexOfBytes:[{$toString:"$createdAt"}, 'T']}]},
          createdAt: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          total: 1,
        },
      },
      {
        $group: {
          _id: '$createdAt',
          total: { $sum: '$total' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    //last 5 recent orders
    // const recentOrders = await OrderModel.find({}).sort('-createdAt').limit(5).select('total')

    // last 5 recent reviews
    const recentReviews = await ReviewModel.find({})
      .sort('-createdAt')
      .limit(5)
      .select('-_id');
    res.status(200).json({ data: data[0], salesData, recentReviews });
  }
);

app.post('/payment', async (req, res) => {
  const { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'INR',
      description: 'Chromato',
      payment_method: id,
      confirm: true,
    });
    console.log('payment', payment);
    res.json({
      message: 'Payment Successfull',
      success: true,
    });
  } catch (error) {
    console.log('error', error);
    res.json({
      message: 'Payment failed',
      success: false,
    });
  }
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'Frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'Frontend', 'build', 'index.html')
    );
  });
}

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = process.env.PORT || 5000;



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
