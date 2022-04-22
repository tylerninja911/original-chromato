const CustomAPIErrorClass = require('./custom-error')

class NotFoundError extends CustomAPIErrorClass {
    constructor(message, statusCode){
        super(message)
        this.statusCode = 404;   
    }
}

module.exports = NotFoundError