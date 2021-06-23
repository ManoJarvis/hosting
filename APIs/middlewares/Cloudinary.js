
// Import cloudinary based modules
const cloudinary=require('cloudinary').v2
const multer=require('multer')
const {CloudinaryStorage}=require('multer-storage-cloudinary')
// configure cloudinary
cloudinary.config({
    cloud_name:'practicemano27',
    api_key:"448248728641347",
    api_secret:"hjabwRfjzQWI4STbtambfD2QcjQ"
})
// configure multer-storage-cloudinary
const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"cloudinaryDemo/dp",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})
// Config multer
const multerObj=multer({storage:clStorage})


// Exports
module.exports=multerObj;