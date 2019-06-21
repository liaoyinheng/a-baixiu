var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'baixiu'
})
connection.connect()


module.exports = {
    // 1.获取所有分类数据
    getAllCateList(callback){
        var sql = 'select * from categories where id != 1'
        connection.query(sql,(err,data) => {
            if(err){
                callback(err)
            }else{
                callback(null,data)
            }
        })
    },

    // 2.新增分类数据
    // obj:需要新增的数据对象，里面有两个属性，一个是名称，一个是别名
    addCate(obj,callback){
        var sql = 'insert into categories values(null,?,?)'
        connection.query(sql,[obj.slug,obj.name],(err,result,feilds) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    },

    // 3.实现分类数据的删除
    cateDeleteById(id,callback){
        var sql = 'delete from categories where id = ' + id
        connection.query(sql,(err,result,feilds) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    },

    // 4.实现分类数据的批量删除
    cateDeleteByIds(ids,callback){
        var sql = `delete from categories where id in (${ids})`
        connection.query(sql,(err,result,feilds) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    },

    // 5.编辑分类数据
    editCate(obj,callback){
        var sql = 'update categories set ? where id = ?'
        connection.query(sql,[obj,obj.id],(err,result) => {
            if(err){
                callback(err)
            }else{
                callback(null,result)
            }
        })
    }
}