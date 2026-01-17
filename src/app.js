const express = require("express")

const app = express();

app.get("/user",(req,res)=>{
    try{
    throw new error("abcdef");
    res.send("succuss");
    }
    catch(err){res.send("catch block executed")};
})

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})


app.listen(3000,()=>{
    console.log("server successfulyy");
})