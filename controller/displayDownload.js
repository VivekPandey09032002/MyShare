const fileModel = require('../model/fileUploadModel.js')
const displayDownload = async (req,res) =>{
    const {id} = req.params;
    let totalSize = 0, downloadLink = "", result
    try {
        result = await fileModel.findOne({uuid : id})
        if(result == null){
            return res.status(404).json({msg : "cannot validate user"}) 
        }
        result.sizes.forEach( (element) => {
            totalSize += parseInt(element)
        })
        totalSize = totalSize/(1024*1024)
    }catch(e){
        console.log(e)
    }
    downloadLink = `https://my-file-share0-0.herokuapp.com/api/${result.uuid}/`
    const fileName = result.fileNames[0].split('.')[0] + '.zip'
    res.render('download.ejs',{"fileName" : fileName, "fileSize" : totalSize.toFixed(2) , "downloadLink" : downloadLink})
}

module.exports = displayDownload;