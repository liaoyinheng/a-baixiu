$(function(){
    // 1.为file表单元素绑定一个事件
    // 当文件选择完毕之后就触发
    $("#feature").on('change',function(){
        // 2.收集图片数据
        // 文件是资源，不是普通的键值对字符串，通过FormData可以获取文件数据
        // FormData是一个构造函数，通过这个函数可以获取指定表单的数据
        var formdata = new FormData()
        // 这个对象有一个方法，这个方法可以让我们自由 在里面添加数据
        // 重点在于它可以添加任意类型的数据
        // formdata.append('name','jack')
        // files获取的是list伪数组
        var file = document.querySelector("#feature").files[0]
        // 将文件 对象追加到formdata中
        formdata.append('img',file)
        formdata.append('name','jackandrose')

        // 3.发起ajax请求
        $.ajax({
            // 传递文件只能使用post，它不可能通过地址栏来进行数据的传递
            type:'post',
            url:'/postUpload',
            // ajax的参数格式一般有三种：
            // 1.key=value&key=value   $(form).serialize()
            // 2.{key:value,key1:value1.....} 自己收集
            // 3.formdata:可以将formdata直接做为参数传递，这是XMLHttpRequest2.0的新功能
            data:formdata,
            // 如果是使用formdata结合ajax来上传文件，必须设置两个属性：
            processData:false,//默认情况下，ajax会对我们传递的数据进行编码，但是我们是使用formdata来实现参数的传递，我们要知道formdata会对数据进行独立的编码操作，所以我们应该让ajax不要处理我们的数据
            contentType:false,//ajax在post方式发送请求的时候，会设置默认的请求头
            // xhr.setRequestHeader('Content-Type",'application/x-www-form-urlencoded'),但是我们是使用formdata来处理的，所以不用它来帮我们设置请求头
            dataType:'json',
            success:function(result){
                console.log(result)
                if(result.code == 2){
                    // 实现预览：为img的src标签赋值
                    setTimeout(() => {
                        $('.thumbnail').attr('src','/uploads/'+result.img).show()
                        // 将图片路径存储到隐藏域中，以便后期的使用
                        $("[name='feature']").val(result.img)
                    }, 3000);
                }
            }

        })
    });

    // 加载分类数据
    (function () {
        $.ajax({
            type:'get',
            url:'/getCategories',
            dataType:'json',
            success:function(result){
                console.log(result)
                // 拼接字符串生成动态结构
                var html = ''
                for(var i=0;i<result.data.length;i++){
                    html += '<option value="'+result.data[i].id+'">'+result.data[i].name+'</option>'
                }
                $('#category').html(html)
            }
        })
    })();

    // 初始化CKEDITOR   
    // 参数就是你想替换的textarea的标识
    // 这个方法相当于在CKEDITOR添加一个content实例
    CKEDITOR.replace( 'content' );

    // 单击保存实现文章数据的添加
    $('.btn_save').on('click',function(){
        // 1.获取文章内容
        // 同步数据，如果不同步，通过js获取textarea中的数据可能不会成功
        CKEDITOR.instances.content.updateElement()
        // var content = $('#content').val()
        // 2.获取文章标题
        // var title = $("#title").val()
        // 3.获取副标题
        // var slug = $('#slug').val()
        // 4.获取图像
        // serialize:可以获取表单中所有拥有name属性的表单元素的value值，它的写法 是 $('form').serialize
        // formdata也可以获取表单中所有拥有name属性的表单元素的value值，它的写法是：new FormData('formDom')
        console.log($('.row').serialize())
        $.ajax({
            type:'post',
            url:'/postAdd',
            data:$('.row').serialize(),
            dataType:'json',
            success:function(result){
                if(result.code == 2){
                    location.href='/admin/posts'
                }
            }
        })
    })
})