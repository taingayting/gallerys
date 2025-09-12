<template>
	<view>
		我是painting详情页
		<button @click="fun2()">>.进入详情2</button>
		<button @click="fun3()" size="mini"  type="primary">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			fun2(){
				// 如果是uni.redirectTo 你进了几页了你反回来的时候就到第一页
				uni.redirectTo({
					url:"/pages/painting_infor_infor2/painting_infor_infor2"
				})
			},
			fun3(){
				uni.navigateBack() 
				// 返回上一级 如果是2 返回  撒好难过
				delta:1
			}
		}
	}
</script>

<style>

</style>
