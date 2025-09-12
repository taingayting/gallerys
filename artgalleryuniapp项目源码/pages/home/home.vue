<template>
	<view> 
	<view class="header" >
		<view style="font-family: 'Times New Roman';font-size: 40px;color: #765B48;font-weight: bold;margin-bottom: 15rpx" >
			Art Gallery
		</view>
		<view class="img_location">
			<image @click="location()" class="loc" src="../../static/img/location.png" mode=""></image>
		</view>
	</view>
		
		
		<view class="search-bar">
		    <input
			 @click="handleSearch"
		      type="text"
		      placeholder="Search"
		      v-model="searchValue"
		      @confirm="handleSearch"
		    />
			    
		</view>
		
		
		
		<!-- map -->
				<!-- 如果需要设置 标记点 则需要使用 属性 markers 属性的属性值必须是一个数组类型的数据,数据中包含
		这个属性的使用语法格式:
							<map markers="data89f"></map>
							data(){
								return{
									键：[
										经度:对应经度的值,
										纬度:对应纬度的值,
										iconPath:"/xxx/xxx/xxx.png"
									]
									
								}
							}
		-->
		 
		<!-- marker 是标记点pin location -->
		
		
			<map class="mymap" scale="15"   :markers="arr"   v-if="showMap" :latitude="41.758794" :longitude="123.463569"></map>
		
		<!-- 
			组件的封装: 就是将项目中重复出现的部分,单独的写到一个固定的文件中,其它位置需要使用则可以引入使用
				1.如何封装
					和pages 同级的位置创建一个目录 components 目录 用于存储封装的组件
					在components 目录位置创建组件(右键)
					将要封装的代码写入到这个组件文件中
				2.如何在其它组件中引入封装组件
					在 script 组件中 使用 import 导入组件
					语法格式: import 名字 from "组件的路径+文件名"
				3.如何使用引入后的封装组件
					在home.vue 的文件中使用 banner 组件的时候,这个组件在引入之后,需要在当前的页面中注册组件
					在data和methods 同级的位置使用 components 属性 注册组件
					语法格式:
						data(){},
						methods:{},
						components:{
							名字
						}
					在引入后,直接将 "名字" 作为组件名去使用
					语法格式: <名字></名字>
				4.如何将数据传递给封装的组件
					在使用组件的位置,给这个组件设置一个自定义属性,并将该组件中的数据作为属性值传递给封装的组件
					<组件名 :自定义属性="你要传递过去的数据"></组件名>
					<组件名 :自定义属性2="你要传递过去的数据2"></组件名>
				5.如何在封装的组件中接收传递的数据
					在封装的组件中的data同级位置使用 props 属性进行接收
					语法格式:
						data(){},
						props:['自定义属性名','自定义属性2']
					在当前先封装的组件中使用自定义属性,就等价于在使用你传递过来的数据了
				6.如何使用传递的数据
		 -->
		<!-- 轮播图 -->
		<!-- 首页 -->
		<!-- 使用第4 -->
		<banner sh="450rpx" :bannerImg="bannerImg"></banner>
		<!-- 模拟在菜单中使用的banner ,因为首页和模拟的高度不一样所以才定义新属性 sh-->
		<!-- <banner sh="280rpx" :bannerImg="bannerImg"></banner> -->
		<!-- 咖啡的故事 -->
		<!-- 如果在style里面还有花括号那图片变成landscape
		<view style="{width: 200rpx;height: 200rpx;background-color: #765B48}"> -->
			<!-- 没有花括号就按width and height 你定义  这里和class一样-->
		
		<!-- Abstract art
		 watercolor Art
		 oil painting-->
		<!-- popular Painting -->
		<titles titlename="Popular Painting"></titles>
		<!-- 滑块开始 -->
		<!-- scroll-view 是大的容器装图popular Painting -->
		<scroll-view scroll-x="true" class="scrollview_popularPainting_container" >
			<!-- 参与循环 -->
			<view class="popularPainting_picFrame" v-for="(item,index) in popularPaintingslid">
				
				<image class="popularPainting_img" :src="item.pps_img" mode=""></image>
				
				<view class="popularPainting_txt">
					{{item.pps_txt}}
				</view>
				
			</view>
	
		</scroll-view>
		<!-- 滑块结束 -->
		<!-- Realistic Artwork
		<titles titlename="Realistic Artwork"></titles> -->
		<titles titlename="Artist"></titles>
		<!-- 滑块开始 -->
		<scroll-view scroll-x="true" class="artist_container" >
			<view class="artist_frame" v-for="(item,index) in artistscroll">
				<image @click="artistfun()" class="artist_img" :src="item.artist_img" mode=""></image>
				<view class="artist_name">
					{{item.artist_name}}
				</view>	
			</view>	
		</scroll-view>
		
		<view class="foryou_full">
			<titles titlename="For You"></titles>
				    <view class="foryou_container">
				        <view class="foryou_frame" v-for="(item, index) in foryou" :key="index">
				            <image class="foryou_img" :src="item" mode="widthFix"></image>
				        </view>
				    </view>
		</view>
		
		
		
			
	</view>
</template>

<script>
	// 导入 banner 组件和tittle
	// 引入组件的时候,需要使用相对路径 
	//在banner和tittles是自定义属性

	import banner from "../../components/banner/banner.vue"
	import titles from "../../components/tittle.vue"
	
	export default {
		data() {
			return {
				
				searchValue: '',
				arr:[
					{
						latitude:"41.758794" ,
						longitude:"123.463569",
						iconPath:'/static/img/location.png'
					}
					
				],
				
				bannerImg:[
					// ../  上一级目录
					"/static/img//banner/4_banner.jpg",
					"/static/img//banner/1_banner.jpg",
					"/static/img//banner/2_banner.jpg",
					 "/static/img//banner/3_banner.jpg",
					 "/static/img//banner/5_banner.jpg",
					 "/static/img//banner/6_banner.jpg"
					
				],
				popularPaintingslid:[
					{
					
						pps_img:"/static/img/popularpainting/1_popularpainting.jpg",
						pps_txt:"Vincent van Gogh,The Starry Night,1889"
					},
					{
					
						pps_img:"/static/img/popularpainting/2_popularpainting.jpg",
						pps_txt:"Leonardo Da Vinci,Mona Lisa, 1503-19"
					},
					{
					
						pps_img:"/static/img/popularpainting/3_popularpainting.jpg",
						pps_txt:"Johannes Vermeer,Girl with a pearl Earring,1665"
					},
					{
					
						pps_img:"/static/img/popularpainting/4_popularpainting.jpg",
						pps_txt:"Gustav Klimt, The Kiss, 1907-1908",
					},
					{
					
						pps_img:"/static/img/popularpainting/5_popularpainting.jpg",
						pps_txt:"Sandro Botticelli, The Birth of Venus, 1484-1486"
					},
					{
					
						pps_img:"/static/img/popularpainting/6_popularpainting.jpg",
						pps_txt:"James Abbott McNeil Whistler, Arrangement in Grey and Black No.1,1871"
					},
					{
					
						pps_img:"/static/img/popularpainting/7_popularpainting.jpg",
						pps_txt:"Jan van Eyck, The Arnolfini Portrait,1434"
					},
					{
					
						pps_img:"/static/img/popularpainting/8_popularpainting.jpg",
						pps_txt:"Hieronymus Bosch, The Garden of Earthly Delights, 1503-1515"
					},
					{
					
						pps_img:"/static/img/popularpainting/9_popularpainting.jpg",
						pps_txt:"Georages Seurat, A Sunday Afternoon on the island of La Grande Jatte,1884-1886"
					},
					{
					
						pps_img:"/static/img/popularpainting/10_popularpainting.jpg",
						pps_txt:"Pablo Picasso, Les Demoiselles dÁvignon, 1907"
					},
				],
				
				artistscroll:[
					{
						artist_img:"../../static/img/artist/artist_5.jpg",
						artist_name:"Frida Kahlo"
					},
					{
						artist_img:"../../static/img/artist/artist_6.jpg",
						artist_name:"Paul Cezanne"
					},
					{
						artist_img:"../../static/img/artist/artist_2.jpg",
						artist_name:"Claude Monet"
					},
					{
						artist_img:"../../static/img/artist/artist_7.jpg",
						artist_name:"Pierre-Auguste Renoir"
					},
					{
						artist_img:"../../static/img/artist/artist_1.jpg",
						artist_name:"Pablo Picasso"
					},
				
					{
						artist_img:"../../static/img/artist/artist_1.png",
						artist_name:"Leonardo da vinci"
					},
					
					{
						artist_img:"../../static/img/artist/artist_3.jpg",
						artist_name:"Rembrandt van Rijin"
					},
					{
						artist_img:"../../static/img/artist/artist_4.jpg",
						artist_name:"Salvador Dali"
					},
				
					
					
					{
						artist_img:"../../static/img/artist/artist_8.jpg",
						artist_name:"Jackson Pollock"
					},
					
				],
				
				foryou:[
					"../../static/img/foryou/foryou_1.jpg",
					"../../static/img/foryou/foryou_2.jpg",
					"../../static/img/foryou/foryou_3.jpg",
					"../../static/img/foryou/foryou_4.jpg",
					"../../static/img/foryou/foryou_5.jpg",
					"../../static/img/foryou/foryou_6.jpg",
					"../../static/img/foryou/foryou_7.jpg",
					"../../static/img/foryou/foryou_8.jpg",
					"../../static/img/foryou/foryou_9.jpg",
					"../../static/img/foryou/foryou_10.jpg",
					"../../static/img/foryou/foryou_11.jpg",
					"../../static/img/foryou/foryou_12.jpg",
					"../../static/img/foryou/foryou_13.jpg",
					"../../static/img/foryou/foryou_14.jpg",
					"../../static/img/foryou/foryou_15.jpg",
					"../../static/img/foryou/foryou_16.jpg",
					"../../static/img/foryou/foryou_17.jpg",
				]
				
			}
		},
		methods: {
			 handleSearch() {
			      // Perform search logic here
			      console.log('Search value:', this.searchValue)
			    },
			location(){
				uni.navigateTo({
					url:'/pages/openmap/openmap'
				})
			}
			
			
		},

		// 注册组件
		components:{
			banner,
			titles
			
		}
		
	}
</script>

<style>
	.header{
		display: flex;
		margin-top: 10rpx;
		
	}
	.loc{
		width: 70rpx;
		height: 70rpx;
		margin-left: 340rpx;
	}
	.search-bar {
	  display: flex;
	  align-items: center;
	  padding: 15px;
	  background-color: #f8f8f8;
	  border-radius: 10px;
	  margin-bottom: 30rpx;
	}
	
	.mymap{
		width: 100%;
		height: 500rpx;
	}
	.scrollview_popularPainting_container{
		width: 100%;
		height: 500rpx;
		margin-top: 10rpx;
		/* border: 1rpx solid red; */
		white-space: nowrap;
	}
	.popularPainting_picFrame{
		width: 350rpx;
		height: 350rpx;
		margin-left: 15rpx;
		border-radius: 20rpx; 
	    /* border: 5rpx solid #765B48 ; */
		display: inline-block;
	
		/* 
			box-shadow
			语法格式：
				box-shadow:参数1 参数2 参数3 参数4；
				参数1： 水平阴影位置 允许是负数
				参数2： 垂直阴影位置 允许是负数
				参数3： 阴影的羽化度（模糊范围）
				参数4： 阴影颜色
				
		 */
		box-shadow: 3px 5px 10px #765B48;
		
	}
	.popularPainting_img{
		/* 整个scrollview320 所有需要一些控件装文本所以要比320rpx小 */
		width: 100%;
		height: 350rpx;
		border-radius: 20rpx; 	
	}
	.popularPainting_txt{
		width: 100%;
		height: 300rpx;
		text-align: center;
		white-space: normal;/* 允许在空格或换行符处换行 */
	
	}
	
	
	.artist_container{
	
		/* 这个值告诉浏览器不要在元素内部自动插入换行 */
		white-space: nowrap;
		/* 强制换行  不压缩*/
		flex-wrap: wrap;
	}
	.artist_frame{
		width: 100%;
		display: inline-block;
		display: table-cell;
		padding:10px 10px 10px 10px;
		/* 固定表格布局，所有列宽相同 */
		table-layout: fixed;	
	}
	.artist_img{
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%; 
	
	}
	.artist_name{
		text-align: center;
		white-space: normal;/* 允许在空格或换行符处换行 */
	}
	
	
	*{
		padding: 0;
		margin: 0;
	}
	.foryou_container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		
	
	}

	.foryou_img {
	width: 370rpx;
	height: 100%;
	border-radius: 20rpx;
	
	}
	
	
</style>
