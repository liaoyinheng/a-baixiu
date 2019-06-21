const postModel = require('../models/postModel')

module.exports = {
    // 获取所有文章数据
    getPostList(req,res){
        var obj = req.query
        // { pageNum: '1',
        //     pageSize: '4',
        //     category_id: '3',
        //     status: 'published' }
        // var pageNum = obj.pageNum
        // var pageSize = obj.pageSize
        // pageSize和pageNum应该是由用户操作来决定的，我们就要求用户在获取分页的时候，必须传入这两个参数
        // postModel.getPostList(pageNum,pageSize,(err,data) => {
            postModel.getPostList(obj,(err,data) => {
            if(err){
                res.json({
                    code:1,
                    msg:'查询失败'
                })
            }else{
                res.json({
                    code:2,
                    msg:'查询成功',
                    data:data
                })
            }
        })
    },

    // 添加文章
    postAdd(req,res){
        // 获取用户传递的参数
        var obj = req.body
        // 添加状态保持中存储的用户id
        obj['user_id'] = req.session.currentUser.id
        obj['views'] = 0
        obj['likes'] = 0
        console.log(obj)
        // 调用 数据模块中的方法实现新增
        postModel.postAdd(obj,(err,data) => {
            if(err){
                console.log(err)
                res.json({
                    code:1,
                    msg:'添加失败'
                })
            }else{
                res.json({
                    code:2,
                    msg:'添加成功'
                })
            }
        })
    },

    
}