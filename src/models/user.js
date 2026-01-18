const mongoose = require ('mongoose')
const validator = require('validator')
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

const User = mongoose.model("User", userSchema);

module.exports = { User }