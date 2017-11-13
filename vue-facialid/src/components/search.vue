<template>
    <div id="wholesearch">
    	<div class="titles">			
			搜 索 页 面 
		</div>
		<!-- 巧妙解决作用域问题 -->
		<span id="bug1" style='display:none'></span>
		<span id="bug2" style='display:none'></span>

		<div class="searchuser" style="display: none;">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>部门</th>
						<th>姓名</th>
						<th>账号</th>
						<th>密码</th>
						<th>上班时间</th>
						<th>迟到次数</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='all in allmes'>
						<td>{{all.depa}}</td>
						<td>{{all.name}}</td>
						<td>{{all.username}}</td>
						<td>{{all.password}}</td>
						<td>null</td>
						<td>{{all.latetime}}</td>
					</tr>
					<tr v-show="allmes.length==0">
	                    <td colspan="6" class="text-center text-muted" >
		                    <p>暂无数据....</p>
		                </td>
	                </tr>
				</tbody>
			</table>
		</div>
		<div class="serachdepa" style="display: none;">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>部门</th>
						<th>姓名</th>
						<th>账号</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='value in mes'>
						<td>{{value.department}}</td>
						<td>{{value.name}}</td>
						<td>{{value.username}}</td>
					</tr>
					<tr v-show="mes.length==0">
	                    <td colspan="3" class="text-center text-muted" >
		                    <p>暂无数据....</p>
		                </td>
	                </tr>
				</tbody>
			</table>
		</div>
    </div>
</template>
<script>
	export default{
		data () {
			return {
                allmes:[],
                mes:[]
			}
		},
		mounted(){
			var type=$.session.get('type');
			var Con=$.session.get('Con');
			if(type=='user'){
				this.user(Con);	
			}else{
				this.department(Con);	
			}
		},
		methods:{
            user:function(message){
            	$.session.clear();
            	function debug(message,allmes){
                    $.ajax({
			            type:'post',
			            url:'http://10.21.71.107:8080/FaceRecognize/find/user',
			            beforeSend: function (xhr) {
			                xhr.setRequestHeader("Accept","application/json");
			                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
			            },
			            data:JSON.stringify({'username':message}),
			            success:function(response){
			            	allmes.length=0;
			                if(response.status==3){
			                	allmes.push({
			                		depa:response.user.department,
                                    name:response.user.name,
                                    username:response.user.username,
                                    password:response.user.password,
                                    latetime:response.user.latetimes
			                	});
			                	$('.searchuser').css('display','none')
			                	$('.serachdepa').css('display','none')
			                    $('.searchuser').css('display','block')
			                }else{
			                    alert('获取失败！');			                    
			                }
			            },
			            error:function(response){
			                alert('搜索失败！');        
			            }
			        });

            	}
            	debug(message,this.allmes);
            },
            department:function(messages){
            	$.session.clear();
            	function debugs(messages,mess){
                    $.ajax({
			            type:'post',
			            url:'http://10.21.71.107:8080/FaceRecognize/find/alluser',
			            beforeSend: function (xhr) {
			                xhr.setRequestHeader("Accept","application/json");
			                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
			            },
			            data:JSON.stringify({'department':messages}),
			            success:function(response){
			            	mess.length=0;
			                for(var i=0;i<response.length;i++){
			                    mess.push({
			                        name:response[i].name,
			                        username:response[i].username,
			                        department:response[i].department
			                    })
			                };
			                $('.searchuser').css('display','none');
		                	$('.serachdepa').css('display','none');
		                    $('.serachdepa').css('display','block');
			            },
			            error:function(response){
			                alert('搜索失败！');
			            }
			        })
            	}
            	debugs(messages,this.mes);
            }
		}
	}
</script>
<style>
	h1{
		color: black;
	}
</style>