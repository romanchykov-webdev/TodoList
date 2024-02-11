
const chalk = require('chalk');

const errorMsg = chalk.bgKeyword('red').whiteBright
const successMsg = chalk.bgKeyword('white').greenBright

require('dotenv').config()

const express = require("express")
const mongoose=require("mongoose")
const config=require("config")

const app=express()
// const PORT= process.env.PORT || config.get("serverPort")
const PORT= process.env.PORT
// const MONGO_URL= process.env.MONGO_URL || config.get("dbUrl")
const MONGO_URL= process.env.MONGO_URL
const PRIVATE_KEY= process.env.PRIVATE_KEY
// console.log(PORT)



const corsMiddleWare=require("./middleware/cors.middleware")
app.use(corsMiddleWare)

const filePathMiddleware=require("./middleware/filepath.middleware")
const  path = require('path')
app.use(filePathMiddleware(path.resolve(__dirname,'files')))

// auth
const authRouter=require("./routes/auth.routes")
app.use(express.json())
app.use("/api/auth", authRouter)

// auth
// for avatar
app.use(express.static('static'))
// for avatar

const start= async ()=>{
    try{

        await mongoose.connect(MONGO_URL)

        app.listen(PORT, ()=>{
            console.log(successMsg("Server started on port: ", PORT))
            console.log(successMsg("Server started on MONGO_URL: ", MONGO_URL))
            console.log(successMsg("Server started on PRIVATE_KEY: ", PRIVATE_KEY))
        })
    }catch (e){
        console.log(errorMsg(e))
    }
}
start()