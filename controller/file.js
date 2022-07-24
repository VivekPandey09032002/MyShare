const multer = require("multer");
const path = require('path');
const fileModel = require('../model/fileUploadModel')
const {v4 : uuid} = require('uuid')
//setting up file StorageEngine
const fileStorageEngine = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'./upload')
    },
    filename : (req,file,cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        cb(null,uniqueName)
    } 
})

// middleware of Multer
const uploadMiddleware = multer({
    storage : fileStorageEngine,
    limits : {
        fileSize :  5*1024*1024  //5MB
    }
}).array('files')

// router function 
const uploadFiles = (req,res) => {
    uploadMiddleware (req,res,async (err) => {
        //validate files
        if(!req.files){
            res.status(500).json({msg : "Need all the fields"})
        }
        //checking for error in file
        else if(err){
            res.status(500).json({msg : err.message})
        }
        // upload in mongoose
        else{
            //create model in mongoose
            const fileNames = [], paths = [], sizes = []
            req.files.forEach(element => {
                fileNames.push(element.filename)
                paths.push(element.path)
                sizes.push(element.size)
            });
            
            
            const file = new fileModel({
                fileNames,
                paths,
                sizes,
                uuid : uuid()
            })
            try{
                const result = await file.save();
                res.status(200).json({DownloadLink : `${process.env.HOST}/api/files/${result.uuid}`})
            }catch(e){
                res.status(500).json({msg : e.msg.message})
            }
            
        }
    });
}




module.exports = uploadFiles