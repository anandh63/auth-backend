const express  = require ("express")
const { model } = require("mongoose")
const { InsertVerifyUser } = require("../Controllers/signin")
const { InsertSignUpUser } = require("../Controllers/signin")
const { CheckUser } = require("../Controllers/login")
var router = express.Router()

router.get("/:token", async(req, res) => {

    try {
        const response = await InsertSignUpUser(req.params.token)
        res.status(200).send(response)
    } catch (e) {console.log (e)
    res.status(500).send( `<html>
    <body>
    <h4> Hi, There </h4> 
    <h5>Welcome to the app</h5>
    <p>Link Expired</p>
    <p>regards</p>
    <p>Team</p>
    </body>
    </html>`)}

})
router.post("/verify", async(req, res) => {
   try{ const {name, email, password} = await req.body
    console.log (name, email, password)
    const regCre = await CheckUser (email)
    if(regCre === false) {
        await InsertVerifyUser(name, email, password)
        res.status(200).send(true)

    } else if ( regCre === true) {
        res.status(200).send(false)

    } else if (regCre === "Server Busy") {
        res.status(500).send("Server Busy")
    }} catch (e) {
        res.status(500).send("An error occurred");
    }
})

module.exports = router
