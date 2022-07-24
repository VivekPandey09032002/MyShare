const mongoose = require('mongoose')

const fileUploadSchema = new mongoose.Schema({
    fileNames : [{type : String, required :false}],
    paths : [{type : String, required :false}],
    sizes : [{type : String, required :false}],
    uuid : {type : String, required :true},
    sender : {type : String, required :false},
    receiver : {type : String, required :false}
},{timestamps : true}
)

const fileModel = mongoose.model('upload',fileUploadSchema)
module.exports = fileModel
