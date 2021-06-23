// mini server
const exp=require('express')
const expressErrorHandler=require('express-async-handler')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const adminAPI=exp.Router()
const multerObj=require('./middlewares/Cloudinary')
// patching API
adminAPI.use(exp.json())
let adminCollectionObj;
// Middleware to set adminCollectionObj
adminAPI.use('/',(req,res,next)=>{
    adminCollectionObj=req.app.get('adminCollectionObj')
    next()
})
// Create users for admin
adminAPI.post("/createadmin",expressErrorHandler(async(req,res,next)=>{
    let newUser=req.body;
    let user=await adminCollectionObj.findOne({name:newUser.name})
    if(user===null){
        // hash the password
        let hashedpw= await bcryptjs.hash(newUser.password,7)
        // replace old pw with hashed pw
        newUser.password=hashedpw
        // newUser.profileImg=req.file.path;
        // Insert data into database
        await adminCollectionObj.insertOne(newUser)
        res.send({message:"user created successfully"})
    }else{
        res.send({message:"user already exist"})
    }
}))


// Admin Login
adminAPI.post("/login",expressErrorHandler(async(req,res)=>{
    let user=req.body
    // check for username
    let dbuser=await adminCollectionObj.findOne({name:user.name})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        // compare password
        let pwstatus=await bcryptjs.compare(user.password,dbuser.password)
        // if password not matched
        if(pwstatus===false){
            res.send({message:"invalid password"})
        }else{
            let token= await jwt.sign({name:user.name},'abcdef',{expiresIn:120})
            delete dbuser.password
            res.send({message:"login successfull",token:token,user:dbuser})
        }
    }
}))


// Err handiling
adminAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})


module.exports=adminAPI;