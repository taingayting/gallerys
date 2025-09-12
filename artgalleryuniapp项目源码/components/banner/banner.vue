<template>
	<view>
		<!--
			如果需要实现轮播效果,需要使用两个组件:
				swiper  和  swiper-item  他们两个是父子关系
		 -->
		 <!-- 
			在 uniapp 的页面中 给组件设置样式的方式:
				1.通过class 设置 样式
					<组件 class="类名"></组件>
					.类名{
						属性:属性值;
					}
				2.通过style属性设置样式:
					sh属于属性值
					语法格式: <组件 style="{属性:属性值}"></组件>
					
				注意:style方式设置样式优先级高于 class 
		  -->
		 <swiper style="{height: sh}" class="sw" :style="{height:sh}"  circular interval="5000" autoplay="true" indicator-dots indicator-color="rgb(147,161,161)" indicator-active-color="#232675">
			 <swiper-item v-for="(item,index) in bannerImg">
				<image :style="{height: sh}" :src="item" mode=""></image>
			 </swiper-item>
		 </swiper>
		<!-- <view class="">
		 	我是banner 组件
		 </view> -->
	</view>
</template>

<script>
	export default {
		name:"banner",
		data() {
			return {
				
			};
		},
		//sh是高度
		//bannerr是第4一样的自定义属性
		props:['bannerImg','sh']
	}
</script>

<style>
	swiper{
		width:100%;
		height: 450rpx;
	}
	.sw image{
		width: 100%;
		height: 450rpx;
	}
	
</style>