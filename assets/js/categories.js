$(function () {
    // 页面加载，获取数据
    function init() {
        $.ajax({
            type: 'get',
            url: '/getCategories',
            dataType: 'json',
            success: function (result) {
                // 调用模板引擎，实现动态渲染
                // 引入模板引擎js文件
                // 写模板
                var tempHTML = template('cateListTemp', result)
                $('tbody').html(tempHTML)
            }
        })
    }
    init();


    // 新增分类数据
    $('.btn-add').on('click', function () {
        // 获取用户数据
        var slug = $('#slug').val()
        var name = $('#name').val()
        // 验证
        if (slug.trim().length == 0) {
            $('.alert-danger').html('<strong>错误！</strong>请输入slug别名').fadeIn(1000).delay(2000).fadeOut(1000)
            return
        }
        if (name.trim().length == 0) {
            $('.alert-danger').html('<strong>错误！</strong>请输入name').fadeIn(1000).delay(2000).fadeOut(1000)
            return
        }
        // 发起ajax请求
        $.ajax({
            type: 'post',
            url: '/addCate',
            dataType: 'json',
            data: { slug, name },
            success: function (result) {
                if (result.code == 1) {
                    $('.alert-danger').html('<strong>错误！</strong>添加失败').fadeIn(1000).delay(2000).fadeOut(1000)
                } else {
                    $('.alert-danger').html('<strong>成功！</strong>添加成功').fadeIn(1000).delay(2000).fadeOut(1000)
                    // 数据的重新加载
                    init();
                }
            }
        })
    })

    // 删除单条记录
    // 不要为动态生成的元素直接绑定事件，而应该使用事件委托，一开始就有的元素就是tbody,所以要为tbody来绑定事件
    $('tbody').on('click', '.btn-del', function () {
        if (window.confirm('请问是否真的需要的删除？')) {
            // 如果是自定义属性，那么获取值
            // 1.原生方式：dom.dataset[]
            // 2.如果是jq,那么就通过$(dom).data('')
            var id = $(this).data('id')
            // var id = $(this)[0].dataset
            // 发起ajax请求
            $.ajax({
                type: 'get',
                url: '/cateDeleteById',
                data: { id },
                dataType: 'json',
                success: function (result) {
                    if (result.code == 1) {
                        $('.alert-danger').html('<strong>错误！</strong>删除失败').fadeIn(1000).delay(2000).fadeOut(1000)
                    } else {
                        $('.alert-danger').html('<strong>成功！</strong>删除成功').fadeIn(1000).delay(2000).fadeOut(1000)
                        // 数据的重新加载
                        init();
                    }
                }
            })
        }
    })

    // 实现全选和全不选功能
    // 就是让tbody中的复选框的checked状态和全选复选框的状态一致
    // 建议：添加change
    $('thead input').on('change',function(){
        // prop:如果想获取复选框的checked状态，需要通过prop,而不能通过attr
        var status = $(this).prop('checked')
        // 为其它复选框设置相同的状态
        $('tbody input').prop('checked',status)
        // 让批量删除按钮显示
        if(status){
            $('.dels').fadeIn(500)
        }else{
            $('.dels').fadeOut(500)
        }
    })
    // 为tbody中的复选框绑定事件
    $('tbody').on('click','input',function(){
        // 1.获取当前所有的复选框，获取这个目的就是为了获取所有复选框的数量
        var allchks = $('tbody input')
        // 2.获取当前被选中的复选框
        var slectedchks = $('tbody input:checked')
        // 3.判断是否应该展示批量删除按钮
        if(slectedchks.length > 1){
            $('.dels').fadeIn(500)
        }else{
            $('.dels').fadeOut(500)
        }
        // 4.设置全选按钮的状态，如果当前被选中的复选框的数量和全部的复选的数量一致，说明全部选中了，全选复选框也应该被选中
        if(slectedchks.length == allchks.length){
            $('thead input').prop('checked',true)
        }else{
            $('thead input').prop('checked',false)
        }
    })

    // 实现批量删除
    $('.dels').on('click',function(e){
        // e.preventDefault()
        // 存储所有id的数组
        var ids = []
        // 1.获取所有被选择的复选框的id号
        // 1.1 获取所有被选择的复选框
        var slectedchks = $('tbody input:checked')
        // 1.2 遍历获取每一个复选框的id号
        slectedchks.each((index,value) => {
            ids.push($(value).data('id'))
        })
        // 2.发起ajax请求
        $.ajax({
            type:'get',
            url:'/cateDeleteByIds',
            data:{ids},
            dataType:'json',
            success:function(result){
                if (result.code == 1) {
                    $('.alert-danger').html('<strong>错误！</strong>删除失败').fadeIn(1000).delay(2000).fadeOut(1000)
                } else {
                    $('.alert-danger').html('<strong>成功！</strong>删除成功').fadeIn(1000).delay(2000).fadeOut(1000)
                    // 数据的重新加载
                    init();
                }
            }
        })
    })

    // 为表格中的编辑按钮添加事件--展示默认数据
    // 编辑按钮是动态生成的，所以使用事件委托的方式来添加事件
    $('tbody').on('click','.btn-edit',function(){
        // 1.获取当前需要编辑的数据行数据：之前我们已经将这些数据通过自定义属性的方式进行存储，所以瑞我们只需要获取这些自定义属性
        var data = $(this).data()
        // 2.为我们的表单元素赋值
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('#id').val(data.id)
    })

    // 实现编辑提交
    $('.btn-editsubmit').on('click',function(){
        // 1.获取数据
        var data = $('form').serialize()
        console.log(data)
        // 2.发起ajax请求
        $.ajax({
            type:'post',
            url:'/editCate',
            data:data,
            dataType:'json',
            success:function(result){
                if (result.code == 1) {
                    $('.alert-danger').html('<strong>错误！</strong>编辑失败').fadeIn(1000).delay(2000).fadeOut(1000)
                } else {
                    $('.alert-danger').html('<strong>成功！</strong>编辑成功').fadeIn(1000).delay(2000).fadeOut(1000)
                    // 数据的重新加载
                    init();
                }
            }
        })
    })
})