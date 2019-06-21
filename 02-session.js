// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
const queryString = require('querystring')

// 引入express-session
var session = require('express-session')

const app = express()


//添加监听
app.listen(3001,() => {
    console.log('http://127.0.0.1:3001')
})
// 添加express-session的中间件配置
app.use(session({
    secret: '写个字', // 加密字符串--加盐,值一般是你自己才知道的加密字符串
    // resave: false,//是否强制保存
    // saveUninitialized: false, //是否保存未初始化的session
    // cookie: { secure: true }
  }))



app.get('/',(req,res) => {
    // 如何获取session
    // 如何写入session
    // session操作都是通过req.session来实现的,它是一个对象
    if(req.session.isLogin && req.session.isLogin == 'true'){
        res.end('welcome back')
    }
    else{
        //基本上所有后台语言中默认都不会以session的方式进行状态的保持，如果需要以session方式那么得在express中设置 一个中间件，这里需要使用到一个第三方模块：express-session
        req.session.isLogin = 'true'
        req.session.current = {name:'jack',age:20}
        res.end('first')
    }
})