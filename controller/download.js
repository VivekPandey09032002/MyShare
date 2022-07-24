const JSZip = require('jszip')
const fileModel = require('../model/fileUploadModel.js')
const path = require('path')
const fs = require('fs')

const downloadFile = async (req,res) => {
    //uuid
    const {id} = req.params
    if(!id){
        //if uuid not in params
        return res.status(500).json({msg : "id and index required"})
    }
    try{
        //getting the data from db
        const result = await fileModel.findOne({uuid : id})
        if(result == null){
            return res.status(404).json({msg : 'cannot validate user'})
        }else{

            
            //making zip file
            const zip = new JSZip()
            
            for(let index=0; index < result.fileNames.length;index++){
                //setting path for data
                const mypath  = path.resolve(`./upload/${result.fileNames[index]}`)
                try{
                    // if file exist then only make zip of it
                    if(fs.existsSync(mypath)){
                        const pdfData = fs.readFileSync(mypath);
                        zip.file(result.fileNames[index],pdfData)
                        //delete that file
                        // fs.unlinkSync(mypath)
                    }
                }catch(e){
                    //error while creating zip or delteting it.
                    return res.status(500).json({msg : "something went wrong"})                  
                }    
            }
            // zip path
            const downloadPath = path.resolve(`./upload/${result.fileNames[0].split('.')[0]}.zip`)
            // if zip already exist then don't create another zip
            if(!fs.existsSync(downloadPath)){
                await zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
                .pipe(fs.createWriteStream(`./upload/${result.fileNames[0].split('.')[0]}.zip`))
                .on('finish', function () {
                console.log("zip is created");
                
                return res.download(`./upload/${result.fileNames[0].split('.')[0]}.zip`, function (err){
                    if(err){
                        return res.status(404).json({msg : err}) 
                    }
                })
                });
            }else{
                console.log('zip already exists')
                return res.download(`./upload/${result.fileNames[0].split('.')[0]}.zip`, function (err){
                    if(err){
                        return res.status(404).json({msg : err}) 
                    }
                })
            }
            
        }
    }catch(e){
        res.status(500).json({msg : "error while downloading data"})
    }
    
}

module.exports = downloadFile;