const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User  = require ("../models/user")
const USER_SAFE_DATA = "firstname lastname age gender about skills "

userRouter.get("/user/requests/received", userAuth ,async(req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested" 
        }).populate("fromUserId", ["firstname" , "lastname" , "age" , "gender" , "about" , "skills"])
        res.json({
           message: "data feteched successfully !",
           data: connectionRequest
        })

    } catch (err) {
        req.statusCode(400).send("Error" + err.message);
    }
})

userRouter.get("/user/connections", userAuth , async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or : [
                {toUserId: loggedInUser._id , status: "accepted"},
                {fromUserid: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId" , ["firstname" , "lastname" , "age" , "gender" , "about" , "skills"])
        .populate("toUserId" , ["firstname" , "lastname" , "age" , "gender" , "about" , "skills"])

      

        const data = connectionRequests.map((row) =>{ 
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())   {
               return row.toUserId
            } 
            return row.fromUserId
        });

        res.json({data});
    }
    catch( err ){
        res.status(400).send({message : err.message})
    }
} )

userRouter.get("/feed" , userAuth , async(req,res) => {
    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 :limit;
        const skip = (page - 1) * limit;
        const connectionRequest = await ConnectionRequest.find({
            $or : [{ fromUserId : loggedInUser._id } , {toUserId : loggedInUser._id}],
        }).select("fromuserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId);
            hideUserFromFeed.add(req.toUserId)
        })

        const users = await User.find({
            $and: [
                {_id:  {$nin: Array.from(hideUserFromFeed)}} ,
                {_id: { $ne: loggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json({ data : users })

    } catch(err){
         res.status(400).send({message : err.message})
    }
})
module.exports = userRouter;