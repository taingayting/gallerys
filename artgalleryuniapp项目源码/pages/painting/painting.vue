<template>
	<view class="order">
		<view class="painting_title">
			Painting
		</view>
		<!-- 上边的大图 -->
		<image class="banner_img" :src="banner_imgUrl" mode=""></image>
		<view class="order_text">
			Style
		</view>
		<!-- 这个是整个款式 的框装-->
		<view class="order_painting_container">
			<!-- 参与循环 -->
			<view @click="changecolor(index)" :class="num==index? 'order_img active' : 'order_img' " v-for="(item,index) in style_img">
				<image :src="item" mode="" ></image>
			</view>	
		</view>
		<view class="xian"></view>
		
		<!-- 尺寸 -->
		<view class="title">size</view>
		<view class="size-list">
		  <view @click="handleSizeClick(index)"  :class="siz==index?'size-item active':'size-item'" v-for="(size, index) in sizes" >
		    <view :class="size-text">{{ size }}</view>
		    
		  </view>
		</view>
		<view class="title">外框类型</view>
		<view class="frame-list">
		  <view @click="handleFrameClick(index)" :class="fram==index? 'frame-item active':'frame-item'" v-for="(frame, index) in frames">
		    <view :class="frame-text">{{ frame.name }}</view>
			 <view :class="frame-text">{{ frame.thickness }}</view>
		   
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fram:0,
				siz:0,
				selectedSize: '',
				selectedFrame: '',
				num:0,
				// 点击style图片的时候，通过这个路径，上面的banner展示一样的图片
				banner_imgUrl:"/static/img/painting/1painting.jpg",
				style_img:[
					"../../static/img/painting/1painting.jpg",
					"../../static/img/painting/3painting.jpg",
					"../../static/img/painting/4painting.jpg",
					"../../static/img/painting/5painting.jpg",
					"../../static/img/painting/6painting.jpg",
					"../../static/img/painting/7painting.jpg",
					"../../static/img/painting/8painting.jpg",
					"../../static/img/painting/9painting.jpg",
					"../../static/img/painting/10painting.jpg",
					
				],
				
				sizes: ['40*30cm', '50*35cm', '60*40cm', '70*50cm', '80*60cm', '90*70cm'],
				frames: [
				  { name: '珍珠黑框', thickness: '厚2.5厘米' },
				  { name: '华贵金框', thickness: '厚2.5厘米' },
				]
			}
		},
		methods: {
			//用于修改 选择的商品边框颜色
			changecolor(index){
				// console.log(("wwwww"));
				this.num = index;
				this.banner_imgUrl=this.style_img[index];

			},
			handleSizeClick(index) {
			  this.siz = index;
			  console.log(`Selected size: ${this.sizes[index]}`);
			},
			handleFrameClick(index) {
			  this.fram = index;
			  console.log(`Selected frame: ${this.frames[index].name}-${this.frames[index].thickness} `);
			},
		}
	}
</script>

<style>
	.painting_title{
		width: 100%;
		height: 40rpx;
		font-size: 30px;
		font-family: 'Times New Roman', Times, serif;
		text-align: center;
		margin-bottom: 40rpx;
		font-weight: bold;
	}
	.order{
		padding: 30rpx;
	}
	.banner_img{
		width: 100%;
		height: 400rpx;
		
	}
	.order_text{
		width: 100%;
		height: 40rpx;
		font-size: 30px;
		font-family: 'Times New Roman', Times, serif;
		text-align: center;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.order_painting_container{
		
		display: flex;
		flex-wrap: wrap;
		
		justify-content: space-between;
	
	}
	.order_img{
		width: 32%;
		height: 195rpx;
		margin-bottom: 15rpx;
		/* 不想让图片点击的时候冲动就加border然后这个border和active一样 */
		border:5rpx solid #fff;

		
	}
	.order_img image{
		width: 100%;
		height: 190rpx;
		
	}
	//点到那个图片那个图片有边框
	.active{
		border: 5rpx solid #765B48;
	}
	.xian{
		width: 100%;
		height: 2rpx;
		background-color: #765B48;
		margin-top: 70rpx;
		
	}
	
	
	.title {
	  font-size: 20px;
	  font-weight: bold;
	  margin-top: 30rpx;
	  font-family: 'Times New Roman', Times, serif;
	  
	}
	
	.size-list {
	  width: 500rpx;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	  margin-left: 100rpx;
	}
	
	.size-item {
	  width: 150rpx;
	  height: 80rpx;
	 
	  border-radius: 10rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  margin-bottom: 20rpx;
	  background-color: #E6E0DE;
	}
	
	.size-text {
	  font-size: 26rpx;
	}
	
	
	
	.frame-list {
	  display: flex;
	  flex-direction: column;
	  margin: 60rpx;
	}
	
	.frame-item {
	
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 15rpx;
	  background-color: #E6E0DE;
	  border-radius: 10rpx;
	  margin-bottom: 20rpx;
	 
	}
	
	.frame-text {
	  font-size: 20px;
	}
	


</style>
