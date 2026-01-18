const express = require("express")
const  { connectDB }= require("./config/database")
const app = express();
const { User } = require ("./models/user")

app.use(express.json());

 app.post("/signup",async (req,res)=>{

    const user = new User(req.body);
    try{
    await user.save();
    res.send("user data added successfully")
    }
    catch(err){
        res.status(400).send("error saving the user : " + err.message);
    }
 })

 app.get("/user",async (req,res)=>{
    const username= req.body.firstname;
   try{
    const user = await User.find({firstname: username});
    if(user === 0){
         res.status(400).send("something went wrong");
    }
    else
    res.send(user);
   }catch(err){
    res.status(400).send("something went wrong");
   }
 })

 app.get("/feed",async (req,res)=>{
    
    try{
        const users= await User.find({});
        res.send(users);
    }catch(err){
         res.status(400).send("something went wrong");
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
