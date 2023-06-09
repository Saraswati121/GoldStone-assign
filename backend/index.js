const express = require('express')
const connect = require("./src/config/db")
const userRoute= require("./src/controller/user")
const app = express()
const cors= require('cors')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/',userRoute)

app.get('/',(req,res)=>{
    res.send({message:'Welcome to the goldstone server'})
})

app.listen(8080,async()=>{
    await connect;
    console.log('listening on port 8080')
})