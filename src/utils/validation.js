const validator = require ('validator')

const validateSignupData = (req) =>{
    const {firstname , lastname , emailid , password} = req.body
    if(! firstname || !lastname){
        throw new error("name is not valid");
    }
    else if(firstname.length>50 || firstname.length<4){
        throw new error("firstname should be 4-50 characters")
    }
    else if(!validator.isEmail(emailid)){
        throw new error("invalid email Id")
    }
    else if(!validator.isStrongPassword(password)){
        throw new error("password is not strong")
    }
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName" ,
        "lastName" ,
        "emailId" ,
        "photoUrl" ,
        "gender" ,
        "age" ,
        "about" ,
        "skills" ,
    ]

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field))

    return isEditAllowed;
}

module.exports={ validateSignupData , validateEditProfileData }