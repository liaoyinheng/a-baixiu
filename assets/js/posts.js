$(function () {
    var pageSize = 4
    var pageNum = 1
    // 动态加载数据
    // 我们为参数赋值默认值，如果后期没有传入值，就使用这个默认值，如果传入了就使用传入的参数
    function init(query={}) {
        $.ajax({
            type: 'get',
            url: '/posts',
            data: $.extend({
                pageNum: pageNum,//当前页码
                pageSize: pageSize //每页显示的记录数
            },query),
            dataType: 'json',
            success: function (result) {
                // result:只是当前页的数据
                if (result.code == 2) {
                    console.log(result)
                    // console.log(result.data.count)
                    var html = template('postListTemp', result.data)
                    // 生成动态数据结构
                    $('tbody').html(html)
                    // 生成动态的分页结构
                    setPagenator(Math.ceil(result.data.count / pageSize))
                }
            }
        })
    }
    init()

    // 设置分页
    function setPagenator(total) {
        var _this = this
        // 实现分页
        //  我们只需要指定放置分页结构的窗口
        // 同时传入一些必要的参数，这个插件会自动的帮我们生成分页结构
        var options = {
            bootstrapMajorVersion: 3,
            alignment: "center",//居中显示
            currentPage: this.pageNum,//当前页数
            totalPages: total,//总页数 注意不是总条数
            // 添加对分页按钮的操作，当单击分页按钮的时候，会触发下面的事件
            // 参数不要少写
            onPageClicked: function (event, originalEvent, type, page) {
                // page:这个值就是我们当前要去获取数据的当前页码,所以将全局的当前页码重置
                pageNum = page
                // console.log(page)
                // 重新发送获取分页数据的请求
                init()
            }
        }
        // 这里需要指定你想放置分页结构的窗口标识
        $(".pagination").bootstrapPaginator(options);
    };

    // 页面一加载，就加载条件查询中的分类数据
    (function () {
        $.ajax({
            type:'get',
            url:'/getCategories',
            dataType:'json',
            success:function(result){
                console.log(result)
                // 拼接字符串生成动态结构
                var html = '<option value="all">所有分类</option>'
                for(var i=0;i<result.data.length;i++){
                    html += '<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>'
                }
                $('.searchCateList').html(html)
            }
        })
    })();

    // 实现筛选功能
    $('.btn-search').on('click',function(){
        // 下拉列表的值的获取是获取value值
        var cateType = $('.searchCateList').val()
        var status = $('.statusList').val()
        console.log(cateType,status)
        // 判断用户当前是否选择了筛选条件
        var query = {}
        if(cateType != 'all'){
            query['category_id'] = cateType
        }
        if(status != 'all'){
            query['status'] = status
        }
        init(query)
    })


    $('tbody').on('click','.btn-edit',function(){
        // 获取参数
        var id = $(this).data('id')
        // 发送请求
        location.href = '/admin/post-edit/'+id
    })
})