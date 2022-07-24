const express = require('express')
const downloadFile = require('../controller/download.js')
const uploadFiles = require('../controller/file.js')
const displayDownload = require('../controller/displayDownload.js')
const sendEmail = require('../controller/sendEmail.js')
const fetchData = require('../script.js')
const fileUploadRouter = express.Router()


fileUploadRouter.post('/files',uploadFiles)
fileUploadRouter.post('/files/send',sendEmail)
fileUploadRouter.get('/files/:id',displayDownload)
fileUploadRouter.get('/:id',downloadFile)
fileUploadRouter.get('/files/db/deleteData',fetchData)

module.exports = fileUploadRouter