const jwt=require("jsonwebtoken")
const checkToken=(req,res,next)=>{
    try{
        // Get token from header
        let token=req.headers.authorization.split(" ")[1]
        jwt.verify(token,"abcdef")
        next()
    }
    catch(err){
        if(err.message==="jwt malformed")
            res.send({message:"Token does not exist"})
        if(err.message==="jwt expired")
            res.send({message:"Session expired"})
    }
}



module.exports=checkToken;