const express = require("express")
const mongoose=require("mongoose")
const config=require("config")

const app=express()
const PORT= config.get("serverPort")
// console.log(PORT)

const corsMiddleWare=require("./middleware/cors.middleware")
app.use(corsMiddleWare)

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

        await mongoose.connect(config.get("dbUrl"))

        app.listen(PORT, ()=>{
            console.log("Server started on port: ", PORT)
        })
    }catch (e){

    }
}
start()