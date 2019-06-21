const usersModel = require('../models/usersModel')

module.exports = {
    login(req,res){
        // - 接收用户数据:{ email: 'admin@zce.me', password: 'wanglei' }
        // console.log(req.body)
        // - 实现登陆验证
        // 在js中，函数是一个对象，在js中只关注函数的声明位置，而不是关注函数的调用位置
        usersModel.login(req.body.email,(err,data) => {
            if(err){
                res.json({
                    code:1,
                    msg:'服务器错误'
                })
            }else{
                // 没有错误，说明查询语法没有错误，但是不一定查询到了数据
                if(data.length == 0 ){ //查询成功了，但是没有查询到数据
                    // res.json()它就是一个方法 ，能够实现将对象转换为json格式字符串
                    res.json({
                        code:1,
                        msg:'邮箱不存在'
                    })
                }else{
                    // 说明查询到了数据，那么就需要去验证密码是否匹配
                    // 成功登陆才返回了当前用户的所有数据
                    if(data[0].password == req.body.password){
                        // 写入登陆状态
                        req.session.isLogin = 'true'
                        // 将当前用户对象存储到状态保持对象中
                        req.session.currentUser = data[0]
                        res.json({
                            code:200,
                            msg:'登陆成功'
                        })
                    }else{
                        res.json({
                            code:1,
                            msg:'密码错误'
                        })
                    }
                }
            }
        })
        // - 返回验证结果

    }
}