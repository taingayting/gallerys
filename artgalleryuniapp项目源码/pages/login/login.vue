<template>
	<view>
		<!-- 账号:{{ user }}密码:{{pass}} -->
		<view class="fu">
			<image src="/static/img/logo.jpg" class="logo" mode="widthFix"></image>
			<!-- 
				v-model 双向数据绑定:
					就是将 表单中用户输入的数据 和 data中的数据进行绑定
					表单中俄数据被修改为什么.那么data中的数据就被修改成什么
			 -->
			<input v-model="user" type="text" class="ins" placeholder-class="ys" placeholder="请输入用户名"/>
	<!-- 		//你输入错的时候他就告诉你账号错 -->
			<view class="msg">
				{{ usermsg }}
			</view>
			<input v-model="pass"  type="password" class="ins" placeholder-class="ys" placeholder="请输入密码"/>
			<!-- //你输入错的时候他就告诉你密码错 -->
			<view class="msg">
				{{ passmsg }}
			</view>
			<view class="btn" @click="doLoign()">
				登录
			</view>
			<view class="copy">
				@版权所有叩丁狼教育有限公司
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 模拟数据库中的 账号和密码
				username:"admin",
				password:"1234567",
				// 用户输入的账号
				user:"",
				pass:"",
				// 定义两个数据用于存储账号和密码的错误信息
				usermsg:"",
				passmsg:""
			}
		},
		methods: {
			doLoign(){
				//不允许用因为需要跳转的应用内非 tabBar 的页面的路径
				// uni.navigateTo({
				// 	url:"/pages/home/home"
				// })
				// uni.switchTab({
				// 	url:"/pages/home/home"
				// })
				// 逻辑运算符   &&  逻辑与   这个符号两端都必须满足条件,整个表达式才满足
				//             ||  逻辑或   这个符号两端只要一个满足 整个表达式就满足
				if(this.user == "" && this.pass == ""){
					this.usermsg = "账号或密码不能为空"
					this.passmsg = "账号或密码不能为空"
					// this.usermsg = "账号不能为空"
					// if(this.user != this.username){
					// 	this.usermsg = "账号不正确"
					// }else{
					// 	this.usermsg = ""
					// 	if(this.pass != this.password){
					// 		this.passmsg = "密码不正确"
					// 	}else{
					// 		uni.switchTab({
					// 			url:"/pages/home/home"
					// 		})
					// 	}
					// }
				}else{
					// console.log(123123123);
					this.usermsg = ""
					this.passmsg = ""
					if(this.username != this.user || this.password != this.pass){
						this.usermsg = "账号或密码错误"
						this.passmsg = "账号或密码错误"
					}else{
						// 账号和密码都没有问题
						uni.switchTab({
							url:"/pages/home/home"
						})
					}
				}
			}
		}
	}
</script>

<style>
	.fu{
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	
	.logo{
		width: 180rpx;
		border-radius: 50px;
		margin-top:200rpx;
		/* border: 2px solid red; */
	}
	
	.ins{
		border-bottom: 1px solid #eee;
		width: 80%;
		height: 80rpx;
		margin-top:60rpx;
	}
	
	.btn{
		width: 80%;
		height: 80rpx;
		background-color: #765B48;
		border-radius: 20rpx;
		text-align: center;
		line-height: 80rpx;
		color:#fff;
		margin-top: 80rpx;
		
	}
	.copy{
		font-size: 14px;
		margin-top: 200rpx;
		color:#aaa;
		border-bottom: 1px solid #aaa;
	}
	
	.msg{
		font-size: 24rpx;
		width: 80%;
		height: 40rpx;
		text-align: left;
		color:red;
		line-height: 40rpx;
	}
	
	.ys{
		color:#eee;
	}
</style>
