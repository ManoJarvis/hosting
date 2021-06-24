// Create mini exp app
const exp=require('express')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressErrorHandler=require('express-async-handler')
const userAPI=exp.Router()
const checkToken=require('./middlewares/verifyToken')
const multerObj=require('./middlewares/Cloudinary')
require('dotenv').config()
// parching API
userAPI.use(exp.json())
let userCollectionObj;
// Middleware for setting usercollection obj
userAPI.use('/',(req,res,next)=>{
    userCollectionObj=req.app.get("userCollectionObj")
    next()
})

// Demo
// const loginMiddleware=async(req,res,next)=>{
//     console.log(req.body)
//     let newUser=JSON.parse(req.body.userObj);
//     let user=await userCollectionObj.findOne({name:newUser.name})
//     if(user===null){
//         // hash the password
//         let hashedpw= await bcryptjs.hash(newUser.password,7)
//         // replace old pw with hashed pw
//         newUser.password=hashedpw
//         // add img path 
//         newUser.profileImg=req.file.path;
//         // Add usertype
//         newUser.userType="user";
//         // Insert data into database
//         await userCollectionObj.insertOne(newUser)
//         res.send({message:"user created successfully"})
//         next()
//     }else{
//         res.send({message:"user already exist"})
//     }
// }
// userAPI.post("/createusers",loginMiddleware,expressErrorHandler(async(req,res)=>{
//     multerObj.single('dp')
// }))
// Demo

// //Create user using async
userAPI.post("/createusers",multerObj.single('dp'),expressErrorHandler(async(req,res)=>{
    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObj.findOne({name:newUser.name})
    if(user===null){
        // hash the password
        let hashedpw= await bcryptjs.hash(newUser.password,7)
        // replace old pw with hashed pw
        newUser.password=hashedpw
        // add img path 
        newUser.profileImg=req.file.path;
        // Add usertype
        newUser.userType="user";
        // Insert data into database
        await userCollectionObj.insertOne(newUser)
        res.send({message:"user created successfully"})
    }else{
        res.send({message:"user already exist"})
    }
}))




// View data using async
userAPI.get("/getusers",expressErrorHandler(async(req,res,next)=>{
    let userlist=await userCollectionObj.find().toArray()
    res.send({message:userlist})
}))

// Viewing single data using async
userAPI.get("/getusers/:username",expressErrorHandler(async(req,res,next)=>{
    let uname=req.params.username
    let userlist=await userCollectionObj.findOne({name:uname})
    res.send({message:userlist})
}))


// Update Data using Async
userAPI.put("/updateusers/:username",expressErrorHandler(async(req,res)=>{
    let modifieduser=req.body;
    await userCollectionObj.updateOne({name:modifieduser.name},{$set:{...modifieduser}})
    res.send({message:"Data modified"})
}))

//  Delete data using async
userAPI.get("/deleteusers/:username",expressErrorHandler(async(req,res,next)=>{
    let username=req.params.username
    let userdelete=await userCollectionObj.deleteOne({name:username})
    if(userdelete.deletedCount===0){
        res.send({message:`no user existed with username`})
        }
        else{
        res.send({message:"user deleted"})
    } 
}))

// user Login
userAPI.post("/login",expressErrorHandler(async(req,res)=>{
    let user=req.body
    // check for username
    let dbuser=await userCollectionObj.findOne({name:user.name})
    if(dbuser===null){
        res.send({message:"invalid username"})
    }else{
        // compare password
        let pwstatus=await bcryptjs.compare(user.password,dbuser.password)
        // if password not matched
        if(pwstatus===false){
            res.send({message:"invalid password"})
        }else{
            let token= await jwt.sign({name:user.name},process.env.secret,{expiresIn:120})
            delete dbuser.password
            res.send({message:"login successfull",token:token,user:dbuser})
        }
    }
}))

// Testing
userAPI.get('/test',checkToken,(req,res)=>{
    res.send({message:"private message"})
})


// Error Handling
userAPI.get((err,req,res,next)=>{
    res.send({message:err.message})
})
    

// Export
module.exports=userAPI;