var express = require ("express")
const connectDb = require("./db")
var signinRouter = require ("./Routes/signin")
var loginRouter = require ("./Routes/login")
var homeRouter = require ("./Routes/home")
const cors = require ("cors")

var app = express()
const port = 4000;
app.use(express.json())
app.use(cors({origin:"*"}))
connectDb()

app.get("/", (req, res)=> {
    res.send ("hellow world")
})

app.use("/signin",signinRouter)
app.use("/login",loginRouter)
app.use("/home",homeRouter)

app.listen(port, () => {
    console.log(`App listing on port ${port}`)
})