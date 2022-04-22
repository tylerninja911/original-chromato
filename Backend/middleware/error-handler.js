const { CustomAPIErrorClass } = require('../errors')

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    const customError = {
        message:err.message || 'Something went wrong.Please try again later',
        statusCode:err.statusCode || '500'
    }

    if(err.code && err.code === 11000){
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:err.message})
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
        customError.statusCode = 400
    }

    if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors).map(item=>item.message).join(',')
        customError.statusCode = 400
    }

    if(err.name === 'CastError'){
        customError.message = `item with id ${err.value} does not exist`
        customError.statusCode = 400

    }

    res.status(customError.statusCode).json({message:customError.message})

}

module.exports = errorHandlerMiddleware