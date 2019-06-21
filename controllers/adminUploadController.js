const formidable = require('formidable')
var path = require('path')

module.exports = {
    uploadFile(req,res){
        // 1.创建一个文件上传对象
        var form = new formidable.IncomingForm()
        // 2.设置编码设置
        // form.encoding = 'utf-8'
        // 3.设置文件上传的目录
        form.uploadDir = __dirname + '/../uploads'
        // 4.设置保留扩展名
        form.keepExtensions = true
        // 5.调用parse函数，实现文件的上传
        // parse:这可以实现 文件的上传
        // req:请求报文，通过这个Req才可以获取 用户上传的数据
        // 函数有三个参数的说明 ,这个函数在文件上传完成(不管成功还是失败都算完成)的时候触发
        // err:如果上传失败，则返回这个错误对象
        // fields：字段，其实就是用户传递的普通的键值对
        // files：用户上传的文件对象
        form.parse(req,(err,fields,files) => {
            if(err){
                res.json({
                    code:1,
                    msg:'上传失败'
                })
            }else{
                // console.log(fields)
                // console.log('-----------------------------')
                // files.img.path就是当前成功上传的文件的全路径
                // 但是我们现在只需要文件名称
                var filename = path.basename(files.img.path)
                // console.log(filename)
                // res.end('ok')
                res.json({
                    code:2,
                    msg:'上传成功',
                    img:filename
                })
            }
        })
    }
}