const express = require('express')
const router = express.Router()

// 获取文件控制器
const adminPageController = require('./controllers/adminPagesController')
const adminUserController = require('./controllers/adminUserController')
const adminCateController = require('./controllers/adminCateController')
const adminUploadController = require('./controllers/adminUploadController')
const adminPostController = require('./controllers/adminPostController')

// node是基于事件驱动
// js异步非阻塞1
//添加路由
// 路由配置中的函数，不是我们自己调用的.而请求匹配路由的时候，由服务器自动调用，并且会在调用的时候自动给函数传递两个参数，req:请求报文对象  Res:响应报文对象
router.get('/',adminPageController.getIndexPage)
      .get('/list',adminPageController.getListPage)
      .get('/detail',adminPageController.getDetailPage)
      .get('/admin',adminPageController.getAdminIndexPage)
      .get('/admin/comments',adminPageController.getCommentsPage)
      .get('/admin/categories',adminPageController.getCategoriesPage)
      .get('/admin/login',adminPageController.getLoginPage)
      .get('/admin/nav-menus',adminPageController.getNavmenuPage)
      .get('/admin/password-reset',adminPageController.getPassResetPage)
      .get('/admin/post-add',adminPageController.getPostAddPage)
      .get('/admin/post-edit/:id',adminPageController.getPostEditPage)
      .get('/admin/posts',adminPageController.getPostsPage)
      .get('/admin/profile',adminPageController.getProfilePage)
      .get('/admin/settings',adminPageController.getSettingPage)
      .get('/admin/slides',adminPageController.getSlidesPage)
      .get('/admin/users',adminPageController.getUsersPage)

      // 用户登陆业务处理
      .post('/login',adminUserController.login)

      // select>>get    insert>>post   update >> put  delete >> delete
      // 分类业务处理
      .get('/getCategories',adminCateController.getAllCateList)
      .post('/addCate',adminCateController.addCate)
      .get('/cateDeleteById',adminCateController.cateDeleteById)
      .get('/cateDeleteByIds',adminCateController.cateDeleteByIds)
      .post('/editCate',adminCateController.editCate)
      .post('/postUpload',adminUploadController.uploadFile)
      .post('/postAdd',adminPostController.postAdd)
      .get('/posts',adminPostController.getPostList)

module.exports = router