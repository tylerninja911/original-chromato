const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('token missing');
  }

  const token = authHeader.split(' ')[1];
//   console.log(token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name ,role:payload.role };
    next();
  } catch (err) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if(!roles.includes(req.user.role))
          throw new UnauthorizedError('Access Forbidden')
      next();
    }
}

module.exports = {authenticateUser, authorizePermissions};