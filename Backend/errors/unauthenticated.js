const CustomAPIErrorClass = require('./custom-error')

class UnauthenticatedError extends CustomAPIErrorClass {
    constructor(message, statusCode){
        super(message)
        this.statusCode = 401;
        
    }
}

module.exports = UnauthenticatedError