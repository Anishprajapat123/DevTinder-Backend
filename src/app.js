const express = require("express")
const  { connectDB }= require("./config/database")
const app = express();
const { User } = require("./models/user")

app.post("/signup",async (req,res)=>{
    const user = new User({
        firstname: "anish",
        lastname: "prajapat",
        email: "anish@gmail.com",
        password: "12345",
        age: "21",
        gender: "male"
    });
    try{
    await user.save();
    res.send("user data added successfully")
    }
    catch(err){
        res.status(400).send("error saving the user : " + err.message);
    }
})



connectDB().then(()=>{
    console.log("database connected successfully");
    app.listen(3000,()=>{
    console.log("server successfulyy");
})
}).catch(err=>{
    console.error("database cannot be connected");
})
