const User = require ("../Models/User")
const { sendMail } = require("./sendMail")
const bcrypt = require ("bcrypt")
const mongoose = require ("mongoose")
var jwt = require ("jsonwebtoken")
const dotenv = require ("dotenv")
const VerifyUser = require ("../Models/verifyUser");
dotenv.config()


async function InsertVerifyUser (name, email, password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const token = generateToken(email)

        const newUser = new VerifyUser({
            name: name,
            email: email,
            password: hashedPassword,
            token: token,
        })

        const activationLink = `http://localhost:4000/signin/${token}` //yet to add
        const content = `<h4> Hi, There </h4> 
        <h5>Welcome to the app</h5>
        <p>Thank you for singup. Click below link to activate</p>
        <a href=${activationLink}> Click here </a>
        <p>regards</p>
        <p>Team</p>`

        await newUser.save()
        sendMail(email, "Verify User", content)
 
    } catch (e) {console.log (e)}   
} 

function generateToken(email) {
    const token =jwt.sign(email, process.env.singup_secret_token)

    return token;
}

async function InsertSignUpUser(token) {
try {

    const userVerify = await VerifyUser.findOne({token:token})
    if (userVerify) {
        const newUser = new User({
            name: userVerify.name,
            email: userVerify.email,
            password: userVerify.password,
            forgetPassword: {}

        })

        await newUser.save()
        await userVerify.deleteOne({token:token})
        const content = `<h4> Hi, There </h4> 
        <h5>Welcome to the app</h5>
        <p>You are seucessfully registred</p>
        <p>regards</p>
        <p>Team</p>`
        sendMail(newUser.email, "Registration Succesfull", content)
        return `<h4> Hi, There </h4> 
        <h5>Welcome to the app</h5>
        <p>You are seucessfully registred</p>
        <p>regards</p>
        <p>Team</p>`;
    }
    return `<h4> Hi, There </h4> 
    <h5>Welcome to the app</h5>
    <p>Registration Failed</p>
    <p>regards</p>
    <p>Team</p>`
} catch (e) { console.log(e)
    return `<html>
    <body>
    <h4> Hi, There </h4> 
    <h5>Welcome to the app</h5>
    <p>Unexpected error happen...</p>
    <p>regards</p>
    <p>Team</p>
    </body>
    </html>`
}
}

module.exports = {InsertVerifyUser, InsertSignUpUser}