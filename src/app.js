const express = require('express');
const app = express();

app.get("/user/:userId",(req,res)=>{
    console.log(req.params);
    res.send({firstname : "anish1", lastname: "prajapat"});
})

app.get("/user",(req,res)=>{
    res.send({firstname: "anish" , lastname : "prajapat"});
});

app.post("/user",(req,res)=>{
    console.log("save the data to the database");
    res.send("Data successfully saved to database");
})

app.delete("/user",(req,res)=>{
    res.send("deleted successfully");
})


app.use("/test",function(req,res){
    res.send("hello server from 3000");
})



app.listen(3000,()=>{
    console.log("server is started successfully");
});