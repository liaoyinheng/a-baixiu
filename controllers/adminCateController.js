const cateModel = require('../models/cateModel')



module.exports = {
    // 1.获取所有分类数据
    getAllCateList(req,res){
        console.log(req.session.id)
        // 获取数据，需要调用数据模块
        cateModel.getAllCateList((err,data) => {
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

    // 2.新增分类数据
    addCate(req,res){
        // 接收参数
        var obj = req.body
        cateModel.addCate(obj,(err,data) => {
            if(err){
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

    // 3.根据id删除分类数据
    cateDeleteById(req,res){
        // 我们是get方式传递参数
        var id = req.query.id
        // 调用数据模块进行处理
        cateModel.cateDeleteById(id,(err,data) => {
            if(err){
                res.json({
                    code:1,
                    msg:'删除失败'
                })
            }else{
                res.json({
                    code:2,
                    msg:'删除成功'
                })
            }
        })
    },

     // 3.根据id删除分类数据
    cateDeleteByIds(req,res){
        // 我们是get方式传递参数
        var ids = req.query.ids.join(',')
        console.log(ids)
        // 调用数据模块进行处理
        cateModel.cateDeleteByIds(ids,(err,data) => {
            if(err){
                res.json({
                    code:1,
                    msg:'删除失败'
                })
            }else{
                res.json({
                    code:2,
                    msg:'删除成功'
                })
            }
        })
    },

    // 4.实现分类数据的修改
    editCate(req,res){
        // 1.接收参数
        var obj = req.body
        // 2.调用数据模块进行数据的更新
        cateModel.editCate(obj,(err,data)=>{
            if(err){
                res.json({
                    code:1,
                    msg:'编辑失败'
                })
            }else{
                res.json({
                    code:2,
                    msg:'编辑成功'
                })
            }
        })
    }
}