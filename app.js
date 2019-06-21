// 创建服务器，监听用户请求
//引入核心模块
const express = require('express')
//引入第三方模块
var bodyParser = require('body-parser')
// 引入express-session
var session = require('express-session')
//引入自定义模块
const router = require('./router')
const app = express()



//添加监听
app.listen(3001,() => {
    console.log('http://127.0.0.1:3001')
})



// 实现静态资源的托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 实现ejs中间件的设置 
app.set('view engine','ejs')
app.set('views',__dirname + '/views')

// 添加body-parser中间件配置
app.use(bodyParser.urlencoded({extended:false}))

// 添加express-session的中间件配置
app.use(session({ 
    name:'albx_cookie',
    secret: 'aaa'
}))
// 添加一个中间件，这个中间件以后每个请求都会经过
// 它的作用就是来验证用户发送请求实现 路由跳转的时候能不能进行跳转
// 如果通过验证，则可以继续，否则重定向
app.use((req,res,next)=>{
    // 有这几种情况是应该让用户继续进行
    // 1.有状态保持
    // 2.访问登陆页:判断当前路由
    // 3.访问前台页面
    if(req.session.isLogin && req.session.isLogin == 'true' || req.url == '/admin/login' || req.url.indexOf('/admin') == -1){
        // 满足条件，就继续之前的请求
        next()
    }else{
        // 不满足，就重定向
        res.redirect('/admin/login')
    }
})

// 使用路由
app.use(router)
