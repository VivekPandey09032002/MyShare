const db = require('mongoose')
const OPTIONS = {
    dbName : 'fileUpload',
    useNewUrlParser : true,
    useUnifiedTopology : true,
}

db.connect(process.env.DB_URI, OPTIONS)
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
