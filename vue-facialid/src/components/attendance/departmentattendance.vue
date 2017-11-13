<template>
	<div id="departmentAttend">
    	<div  class="titles">部门内部考勤情况</div>
		<table class="table table-striped table-bordered table-hover" >
			<thead>
				<tr>
				    <th rowspan="2">部门</th>
					<th  rowspan="2">姓名</th>
					
					<th colspan="5">第X周的考勤情况</th>
					<th rowspan="2">考勤记用符号</th>
				</tr>
				<tr>
					<th>星期一</th>
					<th>星期二</th>
					<th>星期三</th>
					<th>星期四</th>
					<th>星期五</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='user in alluser'>
				    <td >{{user.department}}</td>
			    	<td >{{user.name}}</td>
					<td class="success"></td>
					<td class="warning"></td>
					<td class="danger"></td>
					<td class="success"></td>
					<td class="warning"></td>
					<td><span class="label-success" style='color:#5E5E5E'>正常</span>,<span class="label-warning" style='color:#5E5E5E'>迟到</span>,<span class="label-danger" style='color:#5E5E5E'>旷班</span></td>
				</tr> 
			</tbody>

		</table>
    </div>
</template>
<script>
	export default{
		data () {
			return {
				alldepa:[],
				alluser:[]
			}
		},
		mounted(){
            this.getalldepa();
            // this.changecss();
		},
		methods:{
			getalldepa:function(){
				function debug(depa,user){
                    $.ajax({
                        type:'post',
                        url:'http://10.21.71.107:8080/FaceRecognize/find/alldepartment',
                        success:function(response){ 
                            for(var i=0;i<response.length;i++){
                                depa.push({
                                    'name':response[i].name
                                });
                                function bug(alluser,alldepa,i){
				                 	$.ajax({
				                         type:'post',
				                         url:'http://10.21.71.107:8080/FaceRecognize/find/alluser',
				                        beforeSend: function (xhr) {
				                            xhr.setRequestHeader("Accept","application/json");
				                             xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
				                        },
				                        data:JSON.stringify({'department':alldepa[i].name}),
				                        success:function(response){
				                            for(var i=0;i<response.length;i++){
				                                alluser.push({
				                                    'name':response[i].name,
				                                    'department':response[i].department,
				                                })
				                            }
				                        }
				                    });            
				                }
				                bug(user,depa,i);
                            }
                        }
                    })
				}
				debug(this.alldepa,this.alluser);
			},
			changecss:function(){
				var html='<td rowspan="4"><p>正常考勤为<span class="label-success">绿色</span></p><p>迟到为<span class="label-warning">橙色</span></p><p>旷班为<span class="label-danger">红色</span></p></td>';
                 $('tr:eq(2)').append(html);
			}
		}
	}
</script>
<style>
	
</style>