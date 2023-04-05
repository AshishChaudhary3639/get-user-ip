const mongoose=require('mongoose')

const ipSchema=new mongoose.Schema({
  ip:String
})

const IpModel=mongoose.model('ip',ipSchema)

module.exports={
  IpModel
}