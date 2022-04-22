const { NotFoundError, UnauthenticatedError, CustomAPIErrorClass, BadRequestError } = require('../errors')
const ProductModel = require('../models/product')
const UserModel = require('../models/user')

const getProductCategories = async (req, res, next) => {
    const categories = await ProductModel.distinct('category')
    res.status(200).json({categories})
}

const getAllProducts = async (req, res, next) => {

    let queryObject = {}
    const {category, sort, fields} =  req.query;

    if(category && category!=='All'){
        queryObject.category = category.toLowerCase();
    }
    
    let result = ProductModel.find(queryObject);

    if(fields){
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)    
    }


    if(sort){

        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }

    const products = await result;
    res.status(200).json({products})
}

const getSingleProduct = async (req, res, next) => {
    const {id:productId} = req.params
    const product = await ProductModel.findOne({_id:productId}).populate('reviews')
    if(!product)
        throw new NotFoundError(`No product with id ${productId}`)

    res.status(200).json({product})
}

const deleteMultipleProducts = async (req, res, next) => {
    await ProductModel.deleteMany({})
    res.status(200)
}

const createMultipleProducts = async (req, res, next) => {
    const {products} = req.body;
    if(!products)
        throw new BadRequestError('Missing products')

    await ProductModel.insertMany(products)

    res.status(201)

}

const addProduct = async (req, res, next) => {
    const product =  await ProductModel.create({...req.body})
    res.status(201).json({product})

}

const deleteProduct = async (req, res, next) => {
    const {id:productId} = req.params;
    const product = await ProductModel.findOne({_id:productId})
    if(!product)
        throw new NotFoundError(`No Product with id ${id}`)

    await product.remove();

    res.status(200).json({msg:'Product deleted successfully'})
}

const updateProduct = async (req, res, next) => {
    const {id:productId} = req.params;
    const product = await ProductModel.findOneAndUpdate({_id:productId}, req.body,{new:true,runValidators:true})
    if(!product)
        throw new NotFoundError(`No Product with id ${id}`)
    res.status(200).json({product})

}

module.exports = {getAllProducts, addProduct, deleteProduct, updateProduct, getSingleProduct, deleteMultipleProducts, createMultipleProducts, getProductCategories}