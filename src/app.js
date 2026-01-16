const express = require('express');
const app = express();

app.use("/text",function(req,res){
    res.send("hello server from 3000");
})

app.listen(3000,()=>{
    console.log("server is started successfully");
});