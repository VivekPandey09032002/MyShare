const file = require('./model/fileUploadModel.js')
const path = require('path')
const fs = require('fs')
require('./db/connection.js')
async function fetchData() {
    // fetch all the files of 24 hours old
    // -24*60*60*1000
    const pastDate = new Date(Date.now() )
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
                console.log(`sucessfully deleted ${file.fileNames[0].split('.')[0]}.zip`)
            }catch(e){
                console.log('error while deleting')
            }

        }
    }else{
        console.log('no file')
    }
    // delete all the files of 24 hours old
}

fetchData().then(process.exit)