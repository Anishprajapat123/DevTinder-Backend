const express = require("express")
const  { connectDB }= require("./config/database")
const app = express();
const { User } = require ("./models/user")
const {validateSignupData} = require ("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

 app.post("/signup",async (req,res)=>{
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

app.post("/login" , async (req,res)=>{
    try{
        const {emailid , password} = req.body;
        const user = await User.findOne({ emailid : emailid })

        if(!user) throw new Error("Invalid credentials");
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login successfully");
        }
        else{
            throw new Error("Invalid credentials");
        }

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
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

app.delete("/user",async (req,res)=>{
    const userid=req.body.userid;
    try{
            const user = await User.findByIdAndDelete(userid);
            res.send("data deleted success fully");
    }catch(err){

    }
})

 app.patch("/user/:userid", async (req,res)=>{
    const userid = req.params?.userid;
    const data = req.body;

    try{
         const ALLOWED_UPDATES = [
        "photoURL","age","gender","about","skills"
    ]

    const isUpdateAlowed=Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
    );

    if(!isUpdateAlowed){
        throw new Error("update not allowed")
    }
    if(data?.skills.length > 10){
        throw new Error("Skills cannot be more than 10");
    }
        await User.findByIdAndUpdate(userid,data,{
            runValidators: true,
        });
        res.send("data updated successfully")
    }catch(err){
        res.status(404).send("something went wrong"+err.message)
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
