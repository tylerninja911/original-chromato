const NotFoundError = require('./not-found')
const UnauthenticatedError = require('./unauthenticated')
const BadRequestError = require('./bad-request')
const CustomAPIErrorClass = require('./custom-error')
const UnauthorizedError = require('./unauthorized')

module.exports = {NotFoundError, UnauthenticatedError, BadRequestError, CustomAPIErrorClass, UnauthorizedError}