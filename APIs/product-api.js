// mini server
const exp=require('express')
const expressErrorHandler=require('express-async-handler')
const productAPI=exp.Router()
const multerObj=require('./middlewares/Cloudinary')
// patching API
productAPI.use(exp.json())

let productCollectionObj;
// Middleware to get productCollectionObj
productAPI.use('/',(req,res,next)=>{
    productCollectionObj=req.app.get('productCollectionObj')
    next()
})
// Display all data
productAPI.get('/getproducts',expressErrorHandler(async(req,res)=>{
    let productlist=await productCollectionObj.find().toArray()
    res.send({message:productlist})
}))
// Display particular data
productAPI.get('/getproducts/:prdname',expressErrorHandler(async(req,res)=>{
    let prd=req.params.prdname
    console.log(prd)
    let productlist=await productCollectionObj.findOne({productname:prd})
    
    if(productlist===null){
        res.send({message:"No products found"})
    }else{
        res.send({message:productlist})
    }
}))
// Create new product
productAPI.post('/createproducts',multerObj.single('pimg'),expressErrorHandler(async(req,res)=>{
    let prd=JSON.parse(req.body.prdObj);
    let prdlist=await productCollectionObj.findOne({model:prd.model})
    if(prdlist===null){
        prd.prdImg=req.file.path;
        await productCollectionObj.insertOne(prd)
        res.send({message:"Product Inserted"})
    }else{
        res.send({message:"product already exists"})
    }
}))



// Err handiling
productAPI.use((err,req,res,next)=>{
    res.send({message:err.message})
})


module.exports=productAPI;