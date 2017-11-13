<template>
	<div id="wholeseestaff">
		<div class="titles"  style="margin-bottom: 20px;">查 看 员 工</div>
		<div class="input-group" style="width: 85%;margin: 0 auto;">
	       <input type="text" placeholder="请输入员工账号" class="form-control input-lg" style='border:1px solid #ccc' v-model="ousername"/>
		   <span class="input-group-btn">
			<button type="button" class="btn btn-primary btn-lg" @click='renew()'>
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
					<th>密码</th>
					<th>上班时间</th>
					<th>迟到次数</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(value,index) in myArr">
					<td>{{value.department}}</td>
					<td>{{value.name}}</td>
					<td>{{value.username}}</td>
					<td>{{value.password}}</td>
					<td>{{value.time}}</td>
					<td>{{value.latetime}}</td>
					<td>
						<button type="button" class="btn btn-danger btn-sm" @click="deletes(index)">删除该员工</button>
						<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modify">修改上班时间</button>
					</td>
				</tr>
				<tr v-show="myArr.length==0">
                    <td colspan="7" class="text-center text-muted" >
	                    <p>暂无数据....</p>
	                </td>
                </tr>
			</tbody>
		</table>
		<!-- 模态框 -->
        <div role="dialog" class="modal fade bs-example-modal-sm" id="modify">
	        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">请修改上班时间</h4>
                    </div>
                    <div class="modal-body">
                    	<input type="text" v-model="time">
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-sm">取消</button>
                        <button data-dismiss="modal" class="btn btn-danger btn-sm" @click='Modification()'>确认</button>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				myArr:[],
                ousername:'',
                time:''
			}
		},
		methods:{
			renew:function(){
            	function returnarr(arr,ousername){
                    var names={
                        'username':ousername
                    };
                    $.ajax({
                        type:'post',
                        url:'http://10.21.71.107:8080/FaceRecognize/find/user',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Accept","application/json; charset=utf-8");
                            xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                        },
                        data:JSON.stringify(names),
                        async : false,
                        success:function(response){
                            if(response.status==3){
                                arr.push({
                                    username:response.user.username,
                                    name:response.user.name,
                                    time:'null',
                                    latetime:response.user.latetimes,
                                    password:response.user.password,
                                    department:response.user.department
                                });
                            }else if(response.status==2){
                                alert('不存在这名员工');
                            }else if(response.status==1){
                                alert('输入用户名有误');
                            }else {
                                alert("更新失败！原因未知???");
                            }
                        },
                        error:function(response){
                            alert('更新失败，错误代码:'+response.status);
                        }
                    });
                }
                returnarr(this.myArr,this.ousername);
                this.ousername=''; 
			},
			deletes:function(index){
                // 函数嵌套，使得函数内可以改变函数外的局部变量myarr
                function getarr(arr,index){
                    var deleteUser={
                        'username':arr[index].username
                    }
                    $.ajax({
                        type:'post',
                        url:'http://10.21.71.107:8080/FaceRecognize/delete/user',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader("Accept","application/json; charset=utf-8");
                            xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                        },
                        data:JSON.stringify(deleteUser),
                        success:function(response){
                            if(response.result=='true'){
                                arr.splice(index,1);
                                alert('该员工已删除');
                            }else{
                                alert("删除失败，错误原因未知???");
                            }
                        },
                        error:function(response){
                            alert('删除失败！错误代码:'+response.status);
                        }
                    });
                }
                getarr(this.myArr,index);
            },
            Modification:function(){
            	alert('暂未实现...')
            }
		}
	}
</script>
<style>
	
</style>