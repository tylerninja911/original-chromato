const { BadRequestError, CustomAPIErrorClass } = require('../errors');
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const UserModel = require('../models/user')

const uploadImage = async (req, res, next) => {
    const id = req.user.userId;
    const {role} = await UserModel.findOne({_id:id})
    if(role !== 'admin')
        return next(new CustomAPIErrorClass("You don't have permission to do this action", 403))

    const maxSize = 1024*1024 // 1mb

    if(!req.files)
        throw new BadRequestError('file not found');
    const image = req.files.image
    if(!image.mimetype.startsWith('image')){
        throw new BadRequestError('please upload an image');
    }
    if(image.size > maxSize)
        throw new BadRequestError(`image size should not be more than ${maxSize/(1024*1024)}mb`)

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
        use_filename:true,
        folder:'chromato_product_images'
    })

    res.status(200).json({image:{src:result.secure_url}})
    fs.unlinkSync(image.tempFilePath)
}

module.exports = uploadImage