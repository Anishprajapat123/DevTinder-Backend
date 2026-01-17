 const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized= token==="xyz";
    if(!isAuthorized){
       res.status(401).send("system unauthorized");
    } else{
       next();
    }
}
const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized= token==="xyz";
    if(!isAuthorized){
       res.status(401).send("system unauthorized");
    } else{
       next();
    }
}


module.exports = {
    adminAuth, userAuth
}