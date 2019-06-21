var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})
connection.connect()

module.exports = {
    // 接收用户名(邮箱),根据邮箱进行相应的查询，返回查询的结果
    login(email,callback){
        // 创建sql语句
        var sql = `select * from users where email = '${email}'`
        // 执行查询
        // err：错误信息对象
        // result:操作结果，如果是增删改，那么就返回一个对象，如果是查询就返回一个数组
        // fields如果是增删改，那么就返回udefined  ,如果是查询就返回数组，里面存储字段的相关信息。一般不用
       
        //下面这个是异步方法：基本上所有读取文件都是应该使用异步的方式，在node以及第三方模块在读取文件的时候都是使用异步
        // 异步有两个特点
        // 1.异步非阻塞，它并不会阻塞后面的代码的执行
        // 2.异步操作的执行顺序并不依赖于它的书写顺序

        // 这里，我们只有一个选择，就是当异步操作做完成 的时候，帮我执行我预先创建好的函数
        connection.query(sql,(err,result,fields) => {
            // console.log(err)
            // console.log(result)
            // console.log(fields)
            if(err){
                callback(err)
            }else {
                callback(null,result)
            }
        })
    }
}