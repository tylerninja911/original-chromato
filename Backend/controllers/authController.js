const { BadRequestError, UnauthenticatedError } = require('../errors');
const UserModel = require('../models/user')

const register = async (req, res, next) => {
    const {email, password} = req.body;
    if(!(email && password)){
        throw new BadRequestError('please enter email and password')
    }
    const user = await UserModel.create({...req.body,role:'member'})
    const token = user.createJWT()
    res.status(201).json({user:{name:user.name, email:user.email},token})

}

const login = async (req, res) => {
    const {email, password} = req.body;
    if(!(email && password)){
        throw new BadRequestError('please enter email and password')
    }

    const user = await UserModel.findOne({email})
    if(!user)
        throw new UnauthenticatedError('invalid credentials')

    const isCorrect = await user.comparePassword(password)
    if(!isCorrect)
        throw new UnauthenticatedError('invalid credentials')

    const token = user.createJWT();
    res.status(200).json({user:{name:user.name, email:user.email, role:user.role},token})
}

module.exports = {register, login}