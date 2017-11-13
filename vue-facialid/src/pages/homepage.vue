<template>
	<div id="wholehome">
		<div class="header">
			<div class="HeadName" @click='databug()'>
			    <router-link to='/homepagecenter' id='center'><span style="color: #576069">人脸识别管理平台</span></router-link>
			</div>
			<div class="Headsearch">
				<select class="srhchoose" style="color:#757575" v-model='searchCon'>
					<option value="null">类型</option>
					<option value="user">员工</option>
					<option value="department">部门</option>
				</select>
			</div>
			<div class="HeadSearch">
				<div class="search bar5"> 
					<form>
						 <input type="text" placeholder="请输入您要搜索的内容..." v-model='search'> 
						 <router-link to='/search'><button type="button" @click='searching()'></button></router-link>
					</form> 
				</div>
			</div>
			<div class="UserHead">
				<div class="UserName">
				    <span>
                    	{{level}}：{{name}}
                    </span>
                    <br>
					<span>
					    账号：{{usernum}}	
					</span>
				</div>
			</div>
		</div>
		<div class="Nav">
				<ul id="accordion" class="accordion">
					<li>
					    <div class="link" style="padding:30px 30% 30px 35%;color:#fff">功能分类</div>	
					</li>
					<li>
						<div class="link" >员 工<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
							<li><a href="#" ><router-link to='/addstaff'>添 加 员 工</router-link></a></li>
							<li><a href="#" ><router-link to='/seestaff'>查 看 员 工</router-link></a></li>
						</ul>
					</li>
					<li>
						<div class="link">部 门<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
						    <li><a href="#" ><router-link to='/seedepartment'>查 看 部 门</router-link></a></li>
							<li><a href="#" ><router-link to='/departmentdetails'>部 门 详 情</router-link></a></li>
						</ul>
					</li>
					<li>
						<div class="link">考 勤<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
						    <li><a href="#" ><router-link to='/staffattendance'>个 人 考 勤 时 间 设 置</router-link></a></li>
						    <li><a href="#" ><router-link to='/departmentattendance'>部 门 内 部 考 勤 情 况</router-link></a></li>
						</ul>
					</li>

					<li>
					    <div class="link" style="border-bottom: 1px solid #FFF;">黑 名 单<i class="fa fa-chevron-down"></i></div>
						<ul class="submenu">
							<li><a href="#" ><router-link to='/stafflist'>员 工 黑 名 单</router-link></a></li>
							<li><a href="#" ><router-link to='/departmentlist'>部 门 黑 名 单</router-link></a></li>
						</ul>
					</li>
				</ul>
		</div>
		<div class="MainCon">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
require('../assets/homepagecss/main.css')
require('../assets/homepagecss/style.css')
require('../assets/homepagecss/font-awesome.min.css')
require('../assets/homepagejs/index.js')
require('../assets/public/JQureySession.js')
// import bus from '../assets/eventBus.js'
export default {
  data () {
    return {
        //用于返回表单数据
        account:'4116003434',
        checkcode:'123456',
        usernum:'',
        level:'',
        name:'',
        //系统时间
        time:'',
        //搜索内容
        search:'',
        searchCon:'null'
    }
  },
  mounted () {
  	this.loginajax();
  	this.getheight();
  },
  methods:{
  	getheight:function(){
        $('.MainCon').attr('style','height:'+($(window).height()-60)+'px')
  	},
    loginajax:function(){
    	var that=this;
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
                that.usernum=response.administrator.username;
                that.level=response.administrator.department;
                that.name=response.administrator.name;
	        },
	        error:function(response){
	            alert('违法进入！');
	            window.opener=null;
		        window.open('','_self');
		        window.close();
	        }
	    })
    },
    //刷新页面 ，用于解决日历的bug
    databug:function(){
    	location.reload();
    },
    searching:function(){
    	if(this.searchCon=='null'){
    		alert('请先选择类型！');
    	}else if(this.searchCon=='user' && this.search !=''){
            $.session.set('type','user');
            $.session.set('Con',this.search);
    	}else if(this.searchCon=='department' && this.search !=''){
            $.session.set('type','department');
            $.session.set('Con',this.search);
    	}
    	location.reload();
    }
  }
}
</script>
<style>
</style>