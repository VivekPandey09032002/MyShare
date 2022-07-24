const db = require('mongoose')
const OPTIONS = {
    dbName : 'fileUpload',
    useNewUrlParser : true,
    useUnifiedTopology : true,
}

db.connect(process.env.DB_URI || "mongodb+srv://vivek123:vivek123@cluster0.zfqfu.mongodb.net/?retryWrites=true&w=majority", OPTIONS)
.then(
// success
(success) => {
    console.log('connected to db')
},
//error
(error) => {
    console.log(error)
}
)

module.exports = db
