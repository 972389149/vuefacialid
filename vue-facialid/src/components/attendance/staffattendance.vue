<template>
	<div id="userAttend">
    	<div class="titles">			
			员工考勤时间设置 
		</div>
		<div class="input-group" style="width: 85%;margin: 20px auto;">
	       <input type="text" placeholder="请输入员工账号" class="form-control input-lg" style='border:1px solid #ccc' v-model='account'/>
		   <span class="input-group-btn">
			<button type="button" class="btn btn-primary btn-lg" @click='check()'>
			  查询
			</button>
		   </span>
		</div>
		<table class="table table-bordered table-hover">
			<thead>
				<tr>
				    <th>部门</th>
					<th>姓名</th>
					<th>周一</th>
					<th>周二</th>
					<th>周三</th>
					<th>周四</th>
					<th>周五</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for='num in mes'>
					<td>{{num.department}}</td>
					<td>{{num.name}}</td>
					<td v-show='judge=="true"'>{{mon}}</td>
					<td v-show='judge=="false"'>
						<div class="btn-group">
				            <button class="btn btn-default typehead">上班时间</button>
				        	<button class="btn btn-default dropdown-toggle" data-toggle='dropdown'  @click='typehead(0)'>
				        	     <span class="caret"></span>
				        	</button>
				        	<ul class="dropdown-menu">
				        		<li v-for='(type,index) in alltypes' @click='change(index)'><a>{{type.type}}</a></li>
				        	</ul>
				        </div>
					</td>
					<td v-show='judge=="true"'>{{tue}}</td>
					<td v-show='judge=="false"'>
						<div class="btn-group">
				            <button class="btn btn-default typehead">上班时间</button>
				        	<button class="btn btn-default dropdown-toggle" data-toggle='dropdown' @click='typehead(1)'>
				        	     <span class="caret"></span>
				        	</button>
				        	<ul class="dropdown-menu">
				        		<li v-for='(type,index) in alltypes' @click='change(index)'><a>{{type.type}}</a></li>
				        	</ul>
				        </div>
					</td>
					<td v-show='judge=="true"'>{{wed}}</td>
					<td v-show='judge=="false"'>
                        <div class="btn-group">
				            <button class="btn btn-default typehead">上班时间</button>
				        	<button class="btn btn-default dropdown-toggle" data-toggle='dropdown' @click='typehead(2)'>
				        	     <span class="caret"></span>
				        	</button>
				        	<ul class="dropdown-menu">
				        		<li v-for='(type,index) in alltypes' @click='change(index)'><a>{{type.type}}</a></li>
				        	</ul>
				        </div>
					</td>
					<td v-show='judge=="true"'>{{thu}}</td>
					<td v-show='judge=="false"'>
					    <div class="btn-group">
				            <button class="btn btn-default typehead">上班时间</button>
				        	<button class="btn btn-default dropdown-toggle" data-toggle='dropdown' @click='typehead(3)'>
				        	     <span class="caret"></span>
				        	</button>
				        	<ul class="dropdown-menu">
				        		<li v-for='(type,index) in alltypes' @click='change(index)'><a>{{type.type}}</a></li>
				        	</ul>
				        </div>
				    </td>
					<td v-show='judge=="true"'>{{fri}}</td>
					<td v-show='judge=="false"'>
                        <div class="btn-group">
				            <button class="btn btn-default typehead">上班时间</button>
				        	<button class="btn btn-default dropdown-toggle" data-toggle='dropdown' @click='typehead(4)'>
				        	     <span class="caret"></span>
				        	</button>
				        	<ul class="dropdown-menu">
				        		<li v-for='(type,index) in alltypes' @click='change(index)'><a>{{type.type}}</a></li>
				        	</ul>
				        </div>
					</td>
					<td>
						<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modify" @click='changetime()' v-show='judge=="true"'>编辑上班时间</button>
						<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modify" @click='surechange()' v-show='judge=="false"'>完成编辑</button>
					</td>
				</tr>
				<tr v-show="mes.length==0">
                    <td colspan="8" class="text-center text-muted">
	                    <p>暂无数据....</p>
	                </td>
                </tr>
			</tbody>
		</table>
    </div>
</template>
<script>
	export default{
		data () {
			return {
				judge:'true',
				account:'',
				mes:[],
				mon:'待设置',
				tue:'待设置',
				wed:'待设置',
				thu:'待设置',
				fri:'待设置',
				alltypes:[{type:'放  假'},{type:'上午班'},{type:'下午班'}],
				clickindex:'',
				time:[{mon:''},{tue:''},{wed:''},{thu:''},{fri:''}]
			}
		},
		mounted(){
			
		},
		methods:{
			check:function(){
				this.mes.length=0;
				function incheck(account,mes){
					var names={
                        'username':account
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
                                mes.push({
                                	department:response.user.department,
                                	name:response.user.name
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
				incheck(this.account,this.mes);
				this.mon='待设置';
				this.tue='待设置';
				this.wed='待设置';
				this.thu='待设置';
				this.fri='待设置';
				$('.typehead').eq(0).text('上班时间');
				$('.typehead').eq(1).text('上班时间');
				$('.typehead').eq(2).text('上班时间');
				$('.typehead').eq(3).text('上班时间');
				$('.typehead').eq(4).text('上班时间');
				this.judge="true";
			},
			changetime:function(){
				this.judge="false";
			},
			surechange:function(){
				this.mon=this.time.mon;
				this.tue=this.time.tue;
				this.wed=this.time.wed;
				this.thu=this.time.thu;
				this.fri=this.time.fri;

				if(this.time.mon=='放假'){
					this.time.mon=0;
				}else if(this.time.mon=='上午班'){
					this.time.mon=1;
				}else{
					this.time.mon=2;
				}
                if(this.time.tue=='放假'){
					this.time.tue=0;
				}else if(this.time.tue=='上午班'){
					this.time.tue=1;
				}else{
					this.time.tue=2;
				}
				if(this.time.wed=='放假'){
					this.time.wed=0;
				}else if(this.time.wed=='上午班'){
					this.time.wed=1;
				}else{
					this.time.wed=2;
				}
				if(this.time.thu=='放假'){
					this.time.thu=0;
				}else if(this.time.thu=='上午班'){
					this.time.thu=1;
				}else{
					this.time.thu=2;
				}
				if(this.time.fri=='放假'){
					this.time.fri=0;
				}else if(this.time.fri=='上午班'){
					this.time.fri=1;
				}else{
					this.time.fri=2;
				}
				function changetime(mon,tue,wed,thu,fri,account,judge){
					var schedule=[];
					schedule.push({
						'username':account,
						'mon':mon,
						'tue':tue,
						'wed':wed,
						'thu':thu,
						'fri':fri
					});
                    $.ajax({
				        type:'post',
				        url:'http://10.21.71.107:8080/FaceRecognize/schedule/add',
				        beforeSend: function (xhr) {
			                xhr.setRequestHeader("Accept","application/json; charset=utf-8");
			                xhr.setRequestHeader("Content-Type","application/json; charset=utf-8");
			            },
			            data:JSON.stringify(schedule),
				        success:function(response){
				        	if(response.status==1){
				        		alert('设置成功！')
				        	}else{
				        		alert('设置失败，原因未知')
				        	}
				        },
				        error:function(response){
				            alert('设置失败，错误代码:'+response.status);
				        }
				    })
				}
				changetime(this.time.mon,this.time.tue,this.time.wed,this.time.thu,this.time.fri,this.account,this.judge);

			},
			change:function(index){
                switch(this.clickindex){
					case 0:
					    if(index==0){
                            $('.typehead').eq(0).text('放 假');
                            this.time.mon='放假';
					    }else if(index==1){
                            $('.typehead').eq(0).text('上午班');
                            this.time.mon='上午班';
					    }else{
                            $('.typehead').eq(0).text('下午班');
                            this.time.mon='下午班';
					    }
					break;
					case 1:
					  if(index==0){
                            $('.typehead').eq(1).text('放 假');
                            this.time.tue='放假';
					    }else if(index==1){
                            $('.typehead').eq(1).text('上午班');
                            this.time.tue='上午班';
					    }else{
                            $('.typehead').eq(1).text('下午班');
                            this.time.tue='下午班';
					    }
					break;
					case 2:
					  if(index==0){
                            $('.typehead').eq(2).text('放 假');
                            this.time.wed='放假';
					    }else if(index==1){
                            $('.typehead').eq(2).text('上午班');
                            this.time.wed='上午班';
					    }else{
                            $('.typehead').eq(2).text('下午班');
                            this.time.wed='下午';
					    }
					break;
					case 3:
					  if(index==0){
                            $('.typehead').eq(3).text('放 假');
                            this.time.thu='放假';
					    }else if(index==1){
                            $('.typehead').eq(3).text('上午班');
                            this.time.thu='上午班';
					    }else{
                            $('.typehead').eq(3).text('下午班');
                            this.time.thu='下午班';
					    }
					break;
					case 4:
					  if(index==0){
                            $('.typehead').eq(4).text('放 假');
                            this.time.fri='放假';
					    }else if(index==1){
                            $('.typehead').eq(4).text('上午班');
                            this.time.fri='上午班';
					    }else{
                            $('.typehead').eq(4).text('下午班');
                            this.time.fri='下午班';
					    }
					break;
					  
				}
			},
			typehead:function(index){
				this.clickindex=index;
			}
		}
	}
</script>
<style>
</style>