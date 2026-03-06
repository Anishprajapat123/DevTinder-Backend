
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const userAuth =async (req,res,next)=>{
  try { const {token}=req.cookies;
    if(!token){
        throw new Error("invalid token");
    }
    const decodedObj = await jwt.verify(token,"Dev_tinder");
    const {_id}=decodedObj;
     const user = await User.findById(_id);
    if(!user){
        throw new Error("User doesnot exist");
    }
    req.user = user;
    next();
}
    catch(err){
        res.status(400).send("error" + err.message)
    }
}


module.exports = {
    userAuth
}