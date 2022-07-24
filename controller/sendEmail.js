const fileModel = require('../model/fileUploadModel.js')
    
const sendEmail = async (req,res) =>{
    const {uuid,emailTo,emailFrom}=req.body
    //validate
    if(!uuid || !emailTo || !emailFrom){
        return res.status(422).send({msg : "all fileds are required"})
    }else{
        //get data from db
        const file = await fileModel.findOne({uuid})
        if(file == null){
            return res.status(404).send({msg : "user Doesn't exist"})
        }
        //one time send email
        if(file.sender){
            return res.status(422).send({msg : "Email Already Send"})
        }else{
            // send email first time
            try{
                file.sender = emailFrom
                file.receiver = emailTo
                await file.save()
                let totalSize = 0
                file.sizes.forEach( (element) => {
                    totalSize += parseInt(element)
                })
                totalSize = totalSize/(1024*1024)
                // send email moudule
                const sendMailNodeMailer = require('./eMailServices.js')
                sendMailNodeMailer({
                    from : emailFrom,
                    to : emailTo,
                    subject : "My file Sharing",
                    text : `${emailFrom} shared a file with you`,
                    html : require('./emailTemplate.js')({
                        emailFrom,
                        downloadLink : `${process.env.host}/files/${file.uuid}`,
                        size : totalSize.toFixed(2) + 'MB',
                        expires : '24 hours'
                    })
                })
                return res.status(200).json({msg : "email send"})
            }catch(e){
                return res.status(500).json({msg : "error occured while sending"})
            }
        }
    }

}

module.exports = sendEmail