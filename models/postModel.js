var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})
connection.connect()


module.exports = {

    getPostList(obj,callback){
        // 获取用户所需要的分页数据
        var sql = `select posts.*,users.nickname,categories.name from posts
        INNER JOIN users on posts.user_id =users.id
        INNER JOIN categories on posts.category_id = categories.id
        where 1 =1  `
        
        // 下面这条sql语句是获取当前posts表中数据行的总数
        var sql2 = 'select count(*) as cnt from posts where 1=1 '
        // 拼接条件
        // 判断用户是否有筛选条件
        if(obj.category_id){
            sql += ' and category_id =' +obj.category_id
            sql2 += ' and category_id =' +obj.category_id
        }
        if(obj.status){
            sql += ` and  posts.status = '${obj.status}'`
            sql2 += ` and  posts.status = '${obj.status}'`
        }


        sql += ` order by id desc
        limit ${(obj.pageNum-1)*obj.pageSize},${obj.pageSize}`


        console.log(sql)

        //下面这个query只是获取用户所需要的分页数据
        connection.query(sql,(err,result) => {
            if(err){
                callback(err)
            }else{
                // 但是仅仅获取分页数据不够，我们还再次执行获取记录总数的sql语句
                // 所以。再次执行sql
                connection.query(sql2,(err2,result2) => {
                    if(err2){
                        callback(err2)
                    }else{
                        callback(null,{result:result,count:result2[0].cnt})
                    }
                })
            }
        })
    },

    // 根据id获取文章信息
    getPostById(id,callback){
        var sql = `select posts.*,users.nickname,categories.name from posts
        INNER JOIN users on posts.user_id =users.id
        INNER JOIN categories on posts.category_id = categories.id
        where posts.id = '${id}'  `
        connection.query(sql,(err,data) => {
            if(err){
                callback(err)
            }else{
                callback(null,data)
            }
        })
    },
















































    // 查询文章分页信息
    // 参数说明：
    // pageNum:当前页码
    // pageSize：每页所显示的记录数
    // getPostList(pageNum,pageSize,callback){
    //     var sql = `select posts.*,users.nickname,categories.name from posts
    //     INNER JOIN users on posts.user_id =users.id
    //     INNER JOIN categories on posts.category_id = categories.id
    //     order by id desc
    //     limit ${(pageNum-1)*pageSize},${pageSize}`

    //     var sql2 = 'select count(*) as cnt from posts'

    //     connection.query(sql,(err,result) => {
    //         if(err){
    //             callback(err)
    //         }else{
    //             connection.query(sql2,(err2,result2) => {
    //                 if(err){
    //                     callback(err)
    //                 }else{
    //                     callback(null,{data:result,count:result2[0]})
    //                 }
    //             })
    //         }
    //     })
    // },

    // 添加文章
    postAdd(obj,callback){
        // var sql = 'insert into posts values(null,?,?,?,?,?,?,?,?,?,?)'

        var sql = 'insert into posts set ?'
        connection.query(sql,[obj],(err,result,feilds) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
        // connection.query(sql,[obj.slug,obj.title,obj.feature,obj.created,obj.content,obj.views,obj.likes,obj.status,obj.user_id,obj.category_id],(err,result,feilds) => {
        //     if(err){
        //         callback(err)
        //     }else{
        //         callback(null,result)
        //     }
        // })
    },
}