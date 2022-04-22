const { NotFoundError, BadRequestError } = require('../errors')
const ReviewModel = require('../models/review')
const ProductModel = require('../models/product')
const checkPermissions = require('../utils/checkPermissions')
const OrderModel = require('../models/orders')
const mongoose = require('mongoose')


const getAllReviews = async (req, res) => {
    const reviews = await ReviewModel.find({})
    res.status(200).json({reviews})
}

const getSingleReview = async (req, res) => {
    const {id:reviewId} = req.params;
    const review = await ReviewModel.find({_id:reviewId})
    if(!review) throw new NotFoundError(`No Review with id ${reviewId}`)
    res.status(200).json({review});
}

const createReview = async (req, res) => {
    
    const {body:{product:productId, rating, description}, user:{userId, name}} = req
    let statusCode = 201;

    if(!(rating && description))
        throw new BadRequestError('Please provide rating and description')

    const isValidProduct = await ProductModel.exists({_id:productId})
    if(!isValidProduct) throw new NotFoundError(`No Product with id ${productId}`)

    
    const alreadySubmittedReview = await ReviewModel.findOne({user:userId, product:productId})
    if(alreadySubmittedReview){
        alreadySubmittedReview.rating = rating;
        alreadySubmittedReview.description = description
        await alreadySubmittedReview.save();
        statusCode = 200
    }
    else{
        req.body.user = userId;
        req.body.name = name;
        await ReviewModel.create(req.body);

    }
    res.status(statusCode).json({msg:'Review submitted'})
    // if(alreadySubmittedReview) throw new BadRequestError(
    //     `Review already submitted for product with id ${productId}`
    //   );

    
    // const review = await ReviewModel.replaceOne({product:productId, user:userId}, req.body, {upsert:true, new:true})

}

const deleteReview = async (req, res) => {
    const {id:reviewId} = req.params;
    const review = await ReviewModel.findOne({_id:reviewId}).select('user product')
    if(!review) throw new NotFoundError(`No Review with id ${reviewId}`)

    checkPermissions(req.user, review.user);

    await review.remove();
    res.status(200).json({msg:'Review deleted successfully'})
}

const updateReview = async (req, res) => {
    const {params:{id:reviewId}, body:{description, title, rating}} = req;
    const review = await ReviewModel.findOne({_id:reviewId})
    if(!review) throw new NotFoundError(`No Review with id ${reviewId}`)
    
    checkPermissions(req.user, review.user);
    review.description = description;
    review.title = title;
    review.rating = rating;
    await review.save()
    res.status(200).json({review})
}

const getProductReview = async (req, res) => {
    const {params:{id:productId}, user:{userId}} = req;
    const id = mongoose.Types.ObjectId(userId)
    const productObjectId = mongoose.Types.ObjectId(productId)
    // const isBuyer = await OrderModel.aggregate([{$match:{user:{$eq:id}}},{$project:{_id:0,orderItems:{$filter:{input:"$orderItems", as:"item",cond:{$eq:["$$item.product", productObjectId]}}}}}, {$match:{orderItems:{$gte:[{$size:'$orderItems'}, 0]}}}, {$count:"orders"}])
    const isBuyer = await OrderModel.exists({user:userId, orderItems:{$elemMatch:{product:productId}}})
    let review = {}
    let description = '', rating = 0
    if(isBuyer)
        review = await ReviewModel.findOne({user:userId, product:productId}) || {};
    
    ({description, rating} = review)
    res.status(200).json({isBuyer:isBuyer, rating, description})
    // res.status(200).json({isBuyer:Boolean(isBuyer?.[0]?.['orders']), rating, description})

}

module.exports = {getAllReviews, getSingleReview, createReview, deleteReview, updateReview,getProductReview};