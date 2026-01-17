const express = require("express")

const app = express();

app.get("/user",(req,res,next)=>{
    console.log("route handler 1");
    next();
}, 
(req,res,next)=>{
    console.log("route handler 2");
    //res.send("handled by 2");
    next();
},
(req,res)=>{
    console.log("route handler 3");
    res.send("handled by 3");
}

)

app.listen(3000,()=>{
    console.log("server successfulyy");
})