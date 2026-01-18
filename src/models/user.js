const mongoose = require ('mongoose')

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
        trim : true
    },
    password : {
        type:String,
        required : true
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
        type : String
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