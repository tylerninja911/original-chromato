const CustomAPIErrorClass = require('./custom-error')

class UnauthorizedError extends CustomAPIErrorClass {
    constructor(message, statusCode){
        super(message)
        this.statusCode = 403;
        
    }
}

module.exports = UnauthorizedError