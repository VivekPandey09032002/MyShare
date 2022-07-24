const file = require('./model/fileUploadModel.js')
const path = require('path')
const fs = require('fs')
// require('./db/connection.js')
const fetchData = async (req,res) =>{
    // fetch all the files of 24 hours old
    
    const pastDate = new Date(Date.now()) //-24*60*60*1000)
    const files = await file.find({createdAt : {$lt : pastDate}})
    if(files.length){
        for(const file of files){
            try{
                const downloadPath = path.resolve(`./upload/${file.fileNames[0].split('.')[0]}.zip`)
                
                for(let index=0; index < file.fileNames.length;index++){
                    const mypath  = path.resolve(`./upload/${file.fileNames[index]}`)
                    fs.unlinkSync(mypath)
                }
                if(fs.existsSync(downloadPath)){
                    fs.unlinkSync(downloadPath)
                }
                await file.remove()
                res.status(200).json({msg : `sucessfully deleted ${file.fileNames[0].split('.')[0]}.zip`})
            }catch(e){
                res.status(422).json({msg : 'error while deleting' })
            }

        }
    }else{
        res.status(422).json({msg : 'no file' })
    }
    // delete all the files of 24 hours old
}



// fetchData().then(process.exit)

module.exports = fetchData