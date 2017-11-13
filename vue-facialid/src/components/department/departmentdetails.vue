<template>
	<div id="seedetails">
		<div id="oAddDepartment">
			<div class="titles"  style="margin-bottom: 20px;">部 门 详 情</div>
			<div class="input-group" style="width: 85%;margin: 0 auto;">
		       <input type="text" placeholder="请输入部门名称" class="form-control input-lg" style='border:1px solid #ccc' v-model="odepartname"/>
			   <span class="input-group-btn">
				<button type="button" class="btn btn-primary btn-lg" @click="check()">
				  查询
				</button>
			   </span>
			</div>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>部门</th>
						<th>姓名</th>
						<th>账号</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="mes in message">
						<td>{{mes.department}}</td>
						<td>{{mes.name}}</td>
						<td>{{mes.username}}</td>
					</tr>

					<tr v-show="message.length==0"> 
                        <td colspan="7" class="text-center text-muted">
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
				odepartname:'',
                message:[]
			}
		},
		methods:{
			check:function(){
				if(this.odepartname!=''){
                    function getdepa(depaname,mes){
	                    $.ajax({
	                        type:'post',
	                        url:'http://10.21.71.107:8080/FaceRecognize/find/alluser',
	                        beforeSend: function (xhr) {
	                            xhr.setRequestHeader("Accept","application/json");
	                            xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
	                        },
	                        data:JSON.stringify({'department':depaname}),
	                        success:function(response){
	                            mes.length=0;
	                            for(var i=0;i<response.length;i++){
	                                mes.push({
	                                    'department':response[i].department,
	                                    'name':response[i].name,
	                                    'username':response[i].username
	                                })
	                            }
	                        },
	                        error:function(response){
	                            alert('出现错误，错误代码:'+response.status);
	                        }
	                    });          
	                }
	                getdepa(this.odepartname,this.message);
	                this.odepartname='';
				}else{
					alert('部门名称不能为空！')
				}
			}
		}
	}
</script>
<style>
	
</style>