const mongoose = require ('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required : true,
        minLength: 4
    },
    lastname: {
        type:String
    },
    emailid: {
        lowercase: true,
        type:String,
        required : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("inavlid email address"+ value)
            }
        }
    },
    password : {
        type:String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new error("password is not strong "+ value)
            }
        }
    },
    age : {
        type: Number,
        min : 18,
    },
    gender: {
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender not valid");
            }
        },
       
    },
    photoURL:{
        type : String,
        validate(value){
            if(!validator.isURL(value)){
                throw new error("inavalid photo url "+value)
            }
        }

    },
    about: {
        type: String
    }, 
    skills: {
        type: [String]
    }

},
{
    timestamps: true
})

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({
        _id: user.id} , "Dev_tinder" , { expiresIn : "7d"});
    return token;
}

userSchema.methods.validatePassword= async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

module.exports =mongoose.model("User", userSchema);