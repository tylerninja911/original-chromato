class CustomAPIErrorClass extends Error {
    constructor(message, statusCode){
        super(message)
        
    }
}

module.exports = CustomAPIErrorClass