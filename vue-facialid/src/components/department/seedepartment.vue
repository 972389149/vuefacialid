<template>
	<div id="seedepartment">
		<div id="ochecks">
			<div class="titles">查 看 部 门</div>
			<table class="table table-striped table-hover" id="myTable">
				<thead>
					
						<th>部门名称</th>
						<th>部门人数</th>
						<th>操作</th>
				
				</thead>
				<tbody>
					<tr v-for="(item,index) in myData">
						<td style='line-height:2.428571'>{{item.name}}</td>
						<td>{{item.number}}</td>
						<td>
						    <button type="button" class="btn btn-danger"  data-toggle="modal" data-target="#delete" @click="deleteD(index)">删除部门</button>
						</td>
					</tr>
					<tr v-show="myData.length==0">
                        <td colspan="3" class="text-center text-muted">
		                    <p>暂无数据....</p>
		                </td>
		            </tr>
				</tbody>
			</table>

			<div class="text-right" style='margin-bottom:20px;'>
			    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#Add">添加部门</button>
			</div>

			<!-- 添加部门模态框 -->
	         <div role="dialog" class="modal fade bs-example-modal-sm" id="Add">
	            <div class="modal-dialog">
	                <div class="modal-content">
	                    <div class="modal-header">
	                        <button type="button" class="close" data-dismiss="modal">
	                            <span>&times;</span>
	                        </button>
	                        <h4 class="modal-title">添加部门</h4>
	                    </div>
	                    <div class="modal-body">
	                    	部门名称：<input type="text" placeholder="请在此处输入部门名称" v-model="Depaname">
	                    </div>
	                    <div class="modal-footer text-right">
	                        <button data-dismiss="modal" class="btn btn-primary btn-sm">取消</button>
	                        <button data-dismiss="modal" class="btn btn-danger btn-sm" id="AddD" @click="add()">确认</button>
	                    </div>
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
				myData:[],
                Depaname:''
			}
		},
		mounted () {
            this.getdata()
		},
		methods:{
            getdata:function(){
                function data(data){
                    $.ajax({
                        type:'post',
                        url:'http://10.21.71.107:8080/FaceRecognize/find/alldepartment',
                        success:function(response){
                            for(var i=0;i<response.length;i++){
                                data.push({
                                    'name':response[i].name,
                                    'number':response[i].epnum
                                })
                            }
                        },
                        error:function(response){

                        }
                    })
                }
                data(this.myData);
            },
            //添加部门
            add:function(){
                function getmyData(Data,Depaname){
                    var data={
                        'name':Depaname
                    }
                    $.ajax({
                        type:'post',
                        url:'http://10.21.71.107:8080/FaceRecognize/add/department',
                        beforeSend: function (xhr) {
                                xhr.setRequestHeader("Accept","application/json; charset=utf-8");
                                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
                            },
                        data:JSON.stringify(data),
                        success:function(response){
                            if(response.status==1){
                                alert('部门已创建');
                                Data.push({
                                     name:Depaname,
                                     number:'0'
                                });
                           }else if(response.status==0){
                               alert("部门已存在");
                           }else{
                               alert('添加失败，原因未知???')
                           }
                        },
                        error:function(response){
                            alert("添加失败，错误代码:"+response.status);
                        }
                    });  
                }
                getmyData(this.myData,this.Depaname);
             },
            deleteD:function(index){ 
                // this.myData.splice(index,1);
                alert('接口待写...');
            }
		}
	}
</script>
<style>
	
</style>