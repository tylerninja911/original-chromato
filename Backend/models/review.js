const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide rating'],
  },
  description: {
    type: String,
    required: [true, 'Please provide review text'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name:{
    type:String,
    required:true
  }
});

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        numOfReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: (Math.round(result[0]?.averageRating * 10)/10) || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

ReviewSchema.post('save', async function () {
  await this.model('Review').calculateAverageRating(this.product);
});


ReviewSchema.post('remove', async function () {
    await this.model('Review').calculateAverageRating(this.product);
  });

module.exports = mongoose.model('Review', ReviewSchema);