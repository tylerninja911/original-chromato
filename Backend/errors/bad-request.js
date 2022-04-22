const CustomAPIErrorClass = require('./custom-error');

class BadRequestError extends CustomAPIErrorClass {
    constructor(message, statusCode){
        super(message)
        this.statusCode = 400;
        
    }
}

module.exports = BadRequestError