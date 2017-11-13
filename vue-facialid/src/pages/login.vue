<template>
	<div id="login">
        <article class="htmleaf-container">
            <header class="htmleaf-header">
                <h1>人脸识别考勤后台管理系统<br><span>Face recognition attendance management system</span></h1>
                <div class="htmleaf-links"></div>
            </header>
            <div class="panel-lite">
              <div class="thumbur">
                <div class="icon-lock"></div>
              </div>
              <h4>管理员登录</h4>
              <div class="form-group">
                <input required="required" class="form-control username" v-model='account'/>
                <label class="form-label">用户名    </label>
              </div>
              <div class="form-group">
                <input type="password" required="required" class="form-control password" v-model='checkcode'/>
                <label class="form-label">密　码</label>
              </div><a href="#">忘记密码 ?  </a>
              <button class="floating-btn" @click='login()'><i class="icon-arrow"></i></button>
            </div>
            <header class="htmleaf-header">
                <h1><span style="font-size: 16px;">Use your smile to change the world. Don't let the world change your smile.</span></h1>
                <div class="htmleaf-links"></div>
            </header>
        </article>
    </div>
</template>
<script>
require('../assets/logincss3/styles.css')
export default {
    data () {
        return {
        //用于返回表单数据
            account:'',
            checkcode:''
        }
    },
    watch:{
            account:function(){
                this.account=this.account.replace(/[\W]/g,'');
            }
        },
    methods:{
        //登录函数
        login:function(){
            var self = this;
            if (this.account == '' || this.checkcode == '') {
                alert('账号或密码不能为空！')
            }else {
                $.ajax({
                    type:'post',
                    url:'http://10.21.71.107:8080/FaceRecognize/login/administrator',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Accept","application/json");
                        xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                    },
                    data:JSON.stringify({
                        'username':this.account,
                        'password':this.checkcode
                    }),
                    success:function(response){
                        switch(response.status){
                            case '3000':
                            self.$router.push('/homepage');
                            // 路由跳转后，刷新一下当前页面 ，用于解决导航的bug 
                            location.reload();
                            break;
                            case '2000':
                            alert('密码错误！');
                            $('.password').val('');
                            break;
                            case '1000':
                            alert('账号不存在！');
                            $('.password').val('');
                            $('.username').val('');
                            break;
                        }
                    },
                    error:function(response){
                        alert('登录失败,错误代码:'+response.status);
                    }
                })
            }
        }
    }
}
</script>
<style>
/*头顶的文字*/
    .htmleaf-header{
        text-align: center;
        margin-top: 20px;
        margin-bottom: 30px; 
        color: #fff;
    }
    h1{
        color: #ffffff;
        font-size: 24px;
    }
</style>