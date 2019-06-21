// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
const queryString = require('querystring')
const app = express()


//添加监听
app.listen(3001,() => {
    console.log('http://127.0.0.1:3001')
})

app.get('/',(req,res) => {
    // req.headers.cookie:它是字符串值
    console.log(req.headers.cookie)
    var cookie = queryString.parse(req.headers.cookie) 
    console.log(cookie)
    // 想来模拟用户是否登陆过
    // 1.如果登陆过，就给出相应提示
    if(cookie.isLogin && cookie.isLogin == 'true'){
        res.end('welcome back')
    }
    // 2.如果没有登陆过,就模拟登陆成功之后的cookie写入
    else{
        // 2.1 通过响应头的方式写入cookie数据
        res.writeHead(200,{
            'Content-Type':'text/html;charset=utf-8',
            'Set-Cookie':'isLogin=true&age=20'
        })
        res.end('你是第一次来啰')
    }
})