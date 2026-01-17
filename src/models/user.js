const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type:String
    },
    lastname: {
        type:String
    },
    emailid: {
        type:String
    },
    password : {
        type:String
    },
    age : {
        type: Number
    },
    gender: {
        typr:String
    }

})

const User = mongoose.model("User", userSchema);

module.exports = { User }