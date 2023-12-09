const express  = require ("express")
const { AuthorizeUser } = require("../Controllers/login")
const router = express.Router()
const client = require("../redis")

router.get("/", async(req, res) => {
    try {
        const auth_token = req.headers.authorization
        const loginCredentials = await AuthorizeUser(auth_token)
        console.log(loginCredentials)
        if (loginCredentials===false) {
            res.status(200).send("Invalid Token")
        }else {
            res.json(loginCredentials)
        }
        
    }catch (e) {
        console.log(e)
        res.status(400).send("Server Busy")
    }
})


module.exports = router
