<template>
	<view>
		<!-- 标题 popular painting 和 realistic artwork -->
		<!-- 每一个container都有不同的封装 -->
		
		<view class=" title">
			<view class="line">
				
			</view>
			<view class="text">
				<!-- 这里代表有两个标题popular painting 和 realistic artwork 还是多按照在home里面数据传递给封装的组件（第4在home） -->
				{{titlename}}
			</view>
			<view class="line">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tittle",
		data() {
			return {
				
			};
		},
		props:["titlename"]
	}
</script>

<style>
	.title{
		width: 100%;
		height: 80rpx; 
		/* border: 1rpx solid #765B48; */
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.line{
		width: 40rpx;
		height: 4rpx;
		background-color: #765B48;
	}
	.text{
		/* 
			margin 不指定就是上下左右
			margin-fangx
			margin: 上下 左右
		 */
		margin:0px 10px;
		font-size: 30px;
		font-family: 'Times New Roman';
		}
	

</style>