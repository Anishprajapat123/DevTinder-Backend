const express = require("express");
const {validateSignupData} = require ("../utils/validation")
const User  = require ("../models/user")
const bcrypt = require("bcrypt")
const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
     try{
    validateSignupData(req)
    const {firstname , lastname , emailid, password} = req.body;
    
    const passwordhash = await bcrypt.hash(password,10);
   // console.log(passwordhash);

    const user = new User({
        firstname, lastname,emailid,password:passwordhash,
    });
   
    await user.save();
    res.send("user data added successfully")
    }
    catch(err){
        res.status(400).send("error saving the user : " + err.message);
    }
 })

authRouter.post("/login" , async (req,res)=>{
    try{
        const {emailid , password} = req.body;
        const user = await User.findOne({ emailid : emailid })

        if(!user) throw new Error("Invalid credentials");
        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
           
            const token = await user.getJWT();

             res.cookie("token", token);

            res.send("Login successfully");
        }
        else{
            throw new Error("Invalid credentials");
        }

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = authRouter;