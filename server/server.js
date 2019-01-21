const express = require("express")
const mongoose = require("mongoose")
const app = express()
//连接mongo,并且使用imoc这个集合
const DB_URL = "mongodb://localhost:27017"
mongoose.connect(DB_URL)
mongoose.connection.on("connected",function(){
  console.log("mongo connect success!")
})

const User = mongoose.model("user",new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
  }))
//新增数据
User.create({
  user:"kobe",
  age:40
},function(err,data){
  if(!err){
    console.log(data)
  }
})

app.get("/",function(req,res){
  res.send("hello,world")
})

app.get("/data",function(req,res){
  //res.send("hello,world")
  User.find({},function(err,doc){
    if(!err){
      res.json(doc)
    }
  })
  //res.json({name:"lebron·james",skill:"basketball"});
})


app.listen(9093,function(){
  console.log("Node server run in 9093")
})