const nodemailer = require ("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_pass,
    }
})

function sendMail(toMail, subject, content) {
    const mailOptions = {
        from: "amulyasara@gmail.com",
        to: toMail,
        subject: subject,
        html: content,

    }

    transporter.sendMail(mailOptions,(error, info) => {
        if (error) { 
            console.log ("error occured",error)
        }else {console.log ("email sent:", info.response)}
    })
}

module.exports = {sendMail}
