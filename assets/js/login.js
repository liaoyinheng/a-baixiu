$(function(){
    $('.btn-primary').on('click',function(){
        // 1.收集用户数据
        var email = $('#email').val()
        var password = $('#password').val()
    
        // 2.进行数据验证
        var reg = /\w+[@]\w+[.]\w+/
        if(!reg.test(email)){
            $('.alert-danger').html('<strong>错误！</strong> 邮箱格式输入错误！').fadeIn(1000).delay(2000).fadeOut(1000)
            return;
        }
        else if(password.length < 6){
            $('.alert-danger').html('<strong>错误！</strong> 密码输入位数不够！').fadeIn(1000).delay(2000).fadeOut(1000)
            return;
        }
    
        // 3.发起ajax请求
        $.ajax({
            type:'post',
            url:'/login',
            data:{
                email:email,
                password:password
            },
            dataType:'json',
            success:function(result){
                if(result.code == 1){
                    $('.alert-danger').html('<strong>错误！</strong> '+result.msg).fadeIn(1000).delay(2000).fadeOut(1000)
                }else{
                    // 成功：跳转
                    location.href='/admin'
                }
            }   
        })
    })
})