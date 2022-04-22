const mongoose = require('mongoose');

const SingleOrderItemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    }
    
})

const OrderSchema = mongoose.Schema({
    subTotal:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    shippingFee:{
        type:Number,
        default:0
    },
    orderItems:[SingleOrderItemSchema],
    status:{
        type:String,
        enum:['pending', 'failed', 'paid','canceled']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    clientSecret:{
        type:String,
        required:true
    },
    paymentIntentId:{
        type:String
    }
    
},{timestamps:true})

module.exports = mongoose.model('Orders', OrderSchema)