const url = require('url')
const postModel= require('../models/postModel')

module.exports = {
    // -------------下面是获取前台交互页面
    getIndexPage(req,res){
        //如果没有render函数，我们之前这样实现：1.fs.readFile  2.调用art-template 3. res.end
        //render就是这三个事情的封装
        //默认会将生成的内容返回到客户端
        res.render('index')
    },
    // 获取文章列表页面
    getListPage(req,res){
        res.render('list')
    },
    // 获取文章详情页面
    getDetailPage(req,res){
        res.render('detail')
    },

    // ---------下面是获取后台管理页面
    // 后台首页
    getAdminIndexPage(req,res){
        // 判断是否登陆过--是否有登陆状态
        if(req.session.isLogin && req.session.isLogin == 'true'){
            res.render('admin/index.ejs')
        }else{
            // 跳转到登陆页面
            // this.getLoginPage(req,res)
            // 重定向
            // res.writeHead(301,{
            //     'Location':'/admin/login'
            // })
            res.redirect('/admin/login')
        }
    },
    // 获取评论页面
    getCommentsPage(req,res){
        res.render('admin/comments.ejs')
    },
    // 获取分类页面
    getCategoriesPage(req,res){
        res.render('admin/categories.ejs')
    },
    // 获取登陆页面
    getLoginPage(req,res){
        res.render('admin/login.ejs')
    },
    // 获取菜单设置页面
    getNavmenuPage(req,res){
        res.render('admin/nav-menus.ejs')
    },
    // 获取重置密码页面
    getPassResetPage(req,res){
        res.render('admin/password-reset.ejs')
    },
    // 获取添加文章页面
    getPostAddPage(req,res){
        res.render('admin/post-add.ejs')
    },
    // 获取文章列表页面
    getPostsPage(req,res){
        res.render('admin/posts.ejs')
    },
    // 获取文章动态页面--我们需要填充默认值
    getPostEditPage(req,res){
        console.log(typeof req.url)
        var id =url.parse(req.url).path.substring(17)
        // console.log(aa.path.substring(16))
        // 服务器端渲染：数据 + 模板
        postModel.getPostById(id,(err,data) => {
            if(err){
                console.log(err)
                res.json({})
            }else{
                console.log(data)
                res.render('admin/post-edit.ejs',data[0])
            }
        })
    },
    // 获取个人设置页面
    getProfilePage(req,res){
        res.render('admin/profile.ejs')
    },
    // 获取网站设置页面
    getSettingPage(req,res){
        res.render('admin/settings.ejs')
    },
    // 获取轮播图设置页面
    getSlidesPage(req,res){
        res.render('admin/slides.ejs')
    },
    // 获取用户设置页面
    getUsersPage(req,res){
        res.render('admin/users.ejs')
    }
}