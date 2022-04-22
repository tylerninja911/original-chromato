const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:[true, 'Please provide a name']
    },
    price:{
        type:Number,
        required:[true, 'Please provide a price']

    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true, 'Please provide category'],
        lowercase:true,
    },

    image:{
        type:String,
        required:[true, 'Please provide a product image']
    }
    ,
    description:{
        type:String
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    averageRating:{
        type:Number,
        default:0
    }

}, {timestamps:true, toJSON:{virtuals:true}, toObject:{virtuals:true}})



ProductSchema.virtual('reviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'product',
    justOne:false
})

ProductSchema.pre('remove', async function(){
    await this.model('Review').deleteMany({product:this._id})


})

module.exports = mongoose.model('Product', ProductSchema)