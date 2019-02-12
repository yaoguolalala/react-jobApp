const express = require('express')
const utils = require("utility")
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = {"pwd":0,"__v":0}

Router.post("/update",function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})

Router.post('/login',function(req,res){
  const {user,pwd,type} = req.body

  //查询数据库中有没有该用户
  User.findOne({user,pwd:utils.md5(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:"用户名或密码错误"})
    }
    res.cookie('userid',doc._id)
    return res.json({code:0,data:doc})
  })
})

//注册处理
Router.post('/register',function(req,res){
  
  const {user,pwd,type} = req.body
  User.findOne({user:user},function(err,doc){

    //检测有没有重复用户名
    if (doc){
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user,type,pwd:utils.md5(pwd)})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }

      //存储cookie
      const {user,type,_id} = d 
      res.cookie('userid',_id)
      return res.json({code:0,data:{user,type,_id}})
    })

    /*

    User.create({user,pwd:utils.md5(pwd),type},function(err,doc){
      if(err){
        return res.json({code:1,msg:'后端出错了'})
      }
      return res.json({code:0})
    })
    */
  })
})

//后端数据库用户列表页
Router.get('/list',function(req,res){
  const { type } = req.query
  //User.remove({},function(e,q){})
  User.find({type},function(err,doc){
    return res.json({code:0,data:doc})
  })
})


//判断是否登录，且本地有没有cookie数据保存，
Router.get('/info',function(req,res){
  const {userid} = req.cookies
  if(!userid){
    return res.json({code:1})
  }
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:"后端出错了"})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

Router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid
  //console.log(user)
  //Chat.remove({},function(e,q){})
  User.find({},function(e,doc){
    let users = {}
    doc.forEach(v => {
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
  
})


module.exports = Router