const express=require('express')
const router = require('./routes/User.route')
const cors=require('cors')
const fs=require("fs")
const dns=require("dns")
const { connection } = require('./config/db')
const { IpModel } = require('./models/User.model')
console.log(dns)
const app=express()
app.use(express.json())
app.set('trust proxy', true); // trust the first proxy
app.get('/',cors(),async(req, res) => {
    let ipdata=req.headers['cf-connecting-ip']||req.headers['x-real-ip']||req.headers['x-forwarded-for']||req.socket.remoteAddress||'';

    console.warn('ip',ipdata)
    try {
        let data=new IpModel({
            ip:ipdata
        })
        await data.save()
        res.send('IP stored success')
    } catch (error) {
        res.send('IP not stored')
        
    }
});




app.listen(8080,async()=>{
    try{
        await connection
        console.log('DB connected')
    }catch(err){
        console.log('DB not connected')
    }
    console.log('App listing on port 8080')
})