const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const path = require('path')

const _dirname = path.resolve();


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api",router)
app.use(express.static(path.join(_dirname,'/frontend/dist')));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

const PORT = 8080 || process.env.REACT_APP_BACKEND_URL


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running "+PORT)
    })
})
