$(function(){
    // 1.获取我们想修改的menu-posts
    var menu_posts = $('#menu-posts')
    var menu_settings = $('#menu-settings')

    var rouString;
    // 2.判断当前请求是否有参数
    var index = location.href.indexOf('?')
    if( index == -1){ //说明没有参数，从/截取到最后
        // 2.1 获取当前路由的最后一个部分
        rouString = location.href.substring(location.href.lastIndexOf('/') + 1)
    }else{ //有参数
        rouString = location.href.substring(location.href.lastIndexOf('/') + 1,index)
    }

    // 2.判断当前路由是否满足展开条件
    if(rouString== 'posts' || rouString== 'post-add' || rouString== 'categories'){
        // 添加样式
        menu_posts.addClass('in')
        menu_posts.attr('aria-expanded','true')
    }
    else if(rouString== 'nav-menus' || rouString== 'slides' || rouString== 'settings'){
        // 添加样式
        menu_settings.addClass('in')
        menu_settings.attr('aria-expanded','true')
    }

    // 为当前被单击的菜单项添加高亮
    // $('#'+rouString).addClass('active')
    $('[data-id='+rouString+']').addClass('active')
})