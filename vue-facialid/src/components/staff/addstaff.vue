<template>
	<div id="oAddUsers">
		<div class="titles">			
			    添 加 员 工 
		</div>
		<div class="UsersForm">
            <div class="UsersForm1" style="height:350px;">
				<form>
				    <div class="form-group has-error has-feedback" style="margin-top: 58px">
				     	<label class="control-label">账号：</label>
				     	<input class="form-control" type="email" placeholder="选择部门后自动生成账号" disabled style='padding-left:10px;' id="random">
				     	<span class="glyphicon glyphicon-ok form-control-feedback"></span>
				    </div> 
				    <div class="form-group has-success has-feedback" id="namehead">
				     	<label class="control-label">姓名：</label>
				     	<input class="form-control name" type="email" placeholder="请输入该名员工的姓名" style='padding-left:10px;' v-model='name' >
				     	<span class="glyphicon form-control-feedback" id="num"></span>
				    </div>   
				    <div class="form-group has-success has-feedback" id="passwordhead"> 
				     	<label class="control-label" >密码：</label>
				     	<input class="form-control password" type="email" placeholder="请输入密码" style='padding-left:10px;' v-model='password'>
				     	<span class="glyphicon form-control-feedback" id="password"></span>
				    </div>   
			     </form>	
            </div>
            <div class="UsersForm2">
            	<span>选择一张该员工脸部清晰的照片 :</span>
            	<br>
            	<br>
            	<div class="filebox" style="margin-left: 12px;">
            		<a href="javascript:;" class="a-upload">
					    <input type="file" name="" id="fileimg" @change="fileimg()">点击这里上传文件
					</a>
            	</div>
                <div class="UsersImg">
                	<!-- <img :src='srcs' alt=""> -->
                </div>
                <div class="btn-group dropup" style="margin-left: 15px;margin-top: 60px;">
				    <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button" style="height: 30px;width: 200px;background-color: #FAFAFA">选择部门 <span class="caret"></span></button>
				    <ul class="dropdown-menu" style="min-width: 200px;background-color: #FAFAFA">
				        <li class="dropdown-header">部门名称</li>	
				        <li v-for='(depa,index) in alldepa' v-on:click="chosedepa(index)"><a href="##">{{depa.name}}</a></li>			    
				    </ul>
				</div>
            </div>
            <div class="UsersForm3">
                <div class="btn1">
                	<button id="reset" class="btn  btn-default" style="width: 100px;height: 35px;" @click="Reset()">重置</button>
                </div>
                <div class="btn2">
                	<button class="btn  btn-default" style="width: 100px;height: 35px;" @click="Add()">确定</button>
                </div>
            </div>
		</div>
	</div>
</template>
<script>
require('../../assets/usercss/Users.css')
require('../../assets/public/bootstrap.min.css')
require('../../assets/public/bootstrap.min.js')
	export default{
		data () {
			return {
                name:'',
                password:'',
                alldepa:[]
			}
		},
		mounted () {
            this.getalldepa();
            
		},
		watch:{
            password:function(){
                this.password=this.password.replace(/[\W]/g,'');
                if(this.password==''){
                    $('#password').attr('class','glyphicon glyphicon-remove form-control-feedback')
                    $('#passwordhead').attr('class','form-group has-error has-feedback')
                }else{
                    $('#password').attr('class','glyphicon glyphicon-ok form-control-feedback')
                    $('#passwordhead').attr('class','form-group has-success has-feedback')
                }

            },
            name:function(){
                this.name =  this.name.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,'');
                if(this.name==''){
                    $('#num').attr('class','glyphicon glyphicon-remove form-control-feedback')
                    $('#namehead').attr('class','form-group has-error has-feedback')
                }else{
                    $('#num').attr('class','glyphicon glyphicon-ok form-control-feedback')
                    $('#namehead').attr('class','form-group has-success has-feedback')
                }
            }
		},
		methods:{
            getalldepa:function(){
            	//解决作用域问题
            	function debug(alldepa){
                    $.ajax({
				        type:'post',
				        url:'http://10.21.71.107:8080/FaceRecognize/find/alldepartment',
				        beforeSend: function (xhr) {
			                xhr.setRequestHeader("Accept","application/json; charset=utf-8");
			                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
			            },
				        success:function(response){
		                    for(var i=0;i<response.length;i++){
		                        alldepa.push({
		                            'name':response[i].name,
		                        })
		                    };

				        },
				        error:function(response){
				            alert('获取部门失败，错误代码:'+response.status);
				        }
				    })
            	}
            	debug(this.alldepa)			
            },
            chosedepa:function(index){
                    var depr={
	                    'department':$('.dropdown-menu li').eq(index+1).text()
	                }
                    $.ajax({
	                    type:'post',
	                    url:'http://10.21.71.107:8080/FaceRecognize/add/getusername',
	                    beforeSend: function (xhr) {
	                        xhr.setRequestHeader("Accept","application/json; charset=utf-8");
	                        xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
	                    },
	                    data:JSON.stringify(depr),
	                    success:function(response){
	                        $('#random').val(response.username);
	                        $('.dropdown-toggle').html($('.dropdown-menu li').eq(index+1).text()+ ' <span class="caret"></span>')
	                    },
	                    error:function(response){
	                        alert('添加随机账号失败,错误代码:'+response.status);
	                    }
	                })
            },
            fileimg:function(){
                var file = $("#fileimg").val();  
			        if (file == "") {  
			            alert("请选择要上传的图片");   
			        } else {  
			            //检验文件类型是否正确 
			            var exec = file.substring(file.length-3,file.length);  
			            if (exec != "jpg" && exec != "png" && exec != "JPG" && exec != "PNG") {  
			                alert("文件格式不对，请上传图片!");   
			            }else{
			                var reader = new FileReader();
			                reader.onload = function(evt){
			                    $(".UsersImg img").attr("src",evt.target.result);
			                }
			                var file=document.getElementById("fileimg").files[0];  
			                reader.readAsDataURL(file);
			            }
			        }
            },
            CheckNull:function(){
                if(this.name!='' && this.password!='' && $('#random').val()!=''){
			        if($('.UsersImg img').attr("src")!="/static/img/face.fcfe29c.jpg"){
			            if($('.dropdown-toggle').html()!='选择部门 <span class="caret"></span>'){
			                return true;
			            }
			        }
			    }else{
			        return false;
			    }
            },
            Add:function(){
            	if(this.CheckNull()){
		            var ImgBase64=$('.UsersImg img').attr('src');
		            var file=$("#fileimg").val();
		            var UsersData={
		                'username':$('#random').val(),
		                'password':this.password,
		                'name':this.name,
		                'department':$('.dropdown-toggle').text(),
		                'form':file.substring(file.length-3,file.length),
		                'imageStringData':ImgBase64
		            };
		            if(confirm("确认以下信息,添加后将无法修改\n\n账 号 : "+$('#random').val()+"\n姓 名 : "+this.name+"\n密 码 : "+this.password+"\n部 门 : "+$('.dropdown-toggle').text())){
		                $.ajax({
		                    type:'post',
		                    url:'http://10.21.71.107:8080/FaceRecognize/add/user',
		                    data:JSON.stringify(UsersData),
		                    beforeSend: function (xhr) {
		                        xhr.setRequestHeader("Accept","application/json");
		                        xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
		                    },
		                    success:function(response){
		                        if(response.status==1){
		                            alert('添加员工成功！');
		                        }else{
		                            alert('添加员工失败！');
		                        }
		                        $('#reset').trigger('click');
		                    },
		                    error:function(response){
		                        alert("添加失败,错误代码:"+response.status);
		                        $('#reset').trigger('click');
		                    }
		                })            
		            }else{
		                $('.btn1 button').trigger("click");
		            }
		        }else{
		            alert('请检查是否已经完善员工信息！')
		        }
            },
            Reset:function(){
            	$('#random').val('');
            	$("#fileimg").attr("value","");
                $('.UsersImg img').attr('src','/static/img/face.fcfe29c.jpg');
                this.srcs='/static/img/face.fcfe29c.jpg';
                $('.dropdown-toggle').html('选择部门'+ ' <span class="caret"></span>');
                $('#passwordhead').attr('class','form-group has-success has-feedback');
                $('#namehead').attr('class','form-group has-success has-feedback');
                $('#password').attr('class','glyphicon form-control-feedback');
                $('#num').attr('class','glyphicon form-control-feedback');
                $('.password').val('');
                $('.name').val('');
                // 不要采取下面这个方式清空，有bug
                // this.name='';
            	// this.password='';
            }
            
		}
	}
</script>
<style>
	h1{
		color: black;
	}
</style>