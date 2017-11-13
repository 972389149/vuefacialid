<template>
    <div id="wholecenter">
    	<div class="bottom" style="font-size: 12px;padding-top:35px">
			<span>
				协同工作室
			</span>
			<span>
				前端：王馨玮、陈于希
			</span>	
		</div>
		<div class="top">
			<div class="titles">			
				    平 台 主 页 
			</div>
			<div class="data">
				<div id="calendar" class="calendar" style="display:block"></div>
				<span>当前时间 : </span><span class="logintime"></span>
			</div>
			<div class="notice">
			    <div class="noticehead">
			    	通告消息
			    </div>
		    	<div class="notices" style="border-bottom: 2px dashed #FF808E;">
		    		<div class="noticeshead">
		    			消息一
		    		</div>
		    		<div class="noticemain">
		    			消息一主要内容....
		    		</div>
		    		<div class="noticetime">
		    			发布时间 : 【null】
		    		</div>
		    	</div>
		    	<div class="notices">
		    		<div class="noticeshead">
		    			消息二
		    		</div>
		    		<div class="noticemain">
		    			消息二主要内容....
		    		</div>
		    		<div class="noticetime">
		    			发布时间 : 【null】
		    		</div>
		    	</div>
		    </div>
		</div>
    </div>
</template>
<script>
require('../assets/homepagecss/calendar.css')
require('../assets/homepagejs/calendar.js')
	export default{
		data () {
			return {
				
			}
		},
		mounted (){
			this.interval();    
		},
        created (){
             
        },
		methods:{
			//获取系统时间,时间显示不能用vue的方式，否则无法更新，原因未知。
		    interval:function(){
				window.setInterval(function() 
				{
			        var d = new Date();
			        var week;
			        switch (d.getDay()){
			            case 1: week="星期一"; break;
			            case 2: week="星期二"; break;
			            case 3: week="星期三"; break;
			            case 4: week="星期四"; break;
			            case 5: week="星期五"; break;
			            case 6: week="星期六"; break;
			            default: week="星期天";
			        }
			        var years = d.getFullYear();
			        var month = add_zero(d.getMonth()+1);
			        var days = add_zero(d.getDate());
			        var hours = add_zero(d.getHours());
			        var minutes = add_zero(d.getMinutes());
			        var seconds= add_zero(d.getSeconds());
			        var ndate = years+"年"+month+"月"+days+"日 "+hours+":"+minutes+":"+seconds+" "+week;
			        function add_zero(temp){
	                    if(temp<10) return "0"+temp;
			            else return temp;
			        }
			        $('.logintime').text(ndate);
				}, 100); 
		    }
		}
	}
</script>
<style>
	
</style>