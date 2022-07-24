require('dotenv').config()
const express = require('express')
require('./db/connection.js')
const cors = require('cors')
const app = express()

// setup private variable
const port = process.env.PORT
const host = process.env.HOST
//cors
app.use(cors({
    origin : "*"
}))

//json parse
app.use(express.static('upload'))
app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

//setting view
app.set('view engine','ejs')
app.set('views','./views')

//config router
app.use('/api',require('./router/fileUploadRouter.js'))


//basic request
app.get('/', (req,res)=> res.json({"msg": "welcome to express"}))

app.listen(port,() => {console.log(`${host}/`)})