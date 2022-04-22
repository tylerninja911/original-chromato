const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../errors');
const UserModel = require('../models/user');
const checkPermissions = require('../utils/checkPermissions');

const getAllUsers = async (req, res) => {
    const users = await UserModel.find({}).select('-password');
    res.status(200).json({users});
}

const getSingleUser = async (req, res) => {
    const {id:userId} = req.params;
    const user = await UserModel.find({_id:userId}).select('-password');
    if(!user) throw new NotFoundError(`No user with id ${userId}`)

    checkPermissions(req.user, userId)

    res.status(200).json({user})

}

const deleteUser = async (req, res) => {
    const {id:userId} = req.params;
    const user = await UserModel.findOne({_id:userId}).select('_id')

    if(!user) throw new NotFoundError(`No user with id ${userId}`)

    checkPermissions(req.user, userId);

    await user.remove();

    res.status(200).json({msg:'User deleted successfully'});

}

const showCurrentUser = async (req, res) => {
    res.status(200).json({user:req.user})

}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    if(!(oldPassword && newPassword)) throw new BadRequestError('Please provide all data');

    const user = await UserModel.findOne({_id:req.user.userId});
    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if(!isPasswordCorrect) throw new UnauthenticatedError('Entered old password is wrong')

    if(oldPassword === newPassword) throw new BadRequestError('Try using another password')

    user.password = newPassword;
    await user.save();
    res.status(200).json({msg:'User password updated successfully'})

}

// const updateUser = async (req, res) => {
//     const {name, email} = req.body;

//     if(!(email && name)) throw new BadRequestError('Please provide email and name')

//     await UserModel.findOneAndUpdate({name, email});

//     res.status(200).json({msg:'User updated'})
// }


module.exports = {getAllUsers, getSingleUser, updateUserPassword, showCurrentUser, deleteUser}