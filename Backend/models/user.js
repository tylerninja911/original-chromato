const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserModel = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name must be provided'],
		minlength:3,
		maxlength:50

    },
    email:{
        type:String,
        required:[true, 'email must be provided'],
		match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		'Please provide valid email'],
		unique:true,
        lowercase:true

    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:8
    },
    role:{
        type:String,
        enum:['admin', 'member'],
        default:'member'
    }


})

UserModel.pre('save', async function(next){
    // if()
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})

UserModel.methods.createJWT = function(){
    const token =  jwt.sign({userId:this._id, name:this.name,
        role:this.role
    }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
    return token;
}

UserModel.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
}   

module.exports = mongoose.model('User', UserModel)