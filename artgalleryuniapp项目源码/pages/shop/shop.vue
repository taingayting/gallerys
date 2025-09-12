<template>
	<view>
		
		<view class="header">
			<view class="search-bar">
			    <input
				 @click="handleSearch"
			      type="text"
			      placeholder="Search"
			      v-model="searchValue"
			      @confirm="handleSearch"
			    />
				    
			</view>
			<view class="shopping_cart">
				<image src="/static/img/shopping-cart.png" mode=""></image>
			</view>
		</view>
		<banner sh="380rpx" :bannerImg="shop_img"></banner>
		<!-- shop -->
		<!-- <view class="category_title">
			<view class="text">
				{{titlename}}
			</view>
		</view> -->
		
		<view class="shop">
			<scroll-view scroll-y="true" class="left">
				

					<!-- 循环的内容 -->
					<!-- 需要让函数只要你点击了那一个，需要传递 参数 把index作为要传递的实参 -->
					<!-- 需要学习一个 判断的语法
					 三元运算符：
						表达式？真区间：假区间
						如果表达式满足条件，则执行真区间的代码，
						如果表达式不满足条件 则执行假区间的代码
					 -->
					
				<view 
				
					@click="display(index)"
					:class="num == index ? 'shop_left_category active' : 'shop_left_category'" 
				    v-for="(item, index) in left_right_array">
					{{item.title}}
				</view>
			</scroll-view>
			
				
			
			<scroll-view :scroll-into-view='scrollintoview ' scroll-y="true" class="right">
				<!-- 参与循环 -->
			    <!--shop_right_category 和  left_right_array 长度一样 ，left_right_array有6次那--shop_right_category也一样6次-->
				<!-- 
					在uniapp 中 + 号是一个特殊的运算符
					+两端都是数值类型，则 做 加法那算  有一方为字符串类型 就做拼接 3+4=7
					"a"+5=a5
					3+4=7
				 -->
				<view  class="shop_right_category"  :id="'box' + index" v-for="(item,index) in left_right_array" >
					<view class="shop_right_title">
						{{item.title}}
					</view>
					<!-- 当前 分类对应的所有商品的大容器 -->
						<view class="shop_right_box">
							<!-- 存储每一个小商品的容器 也是参与循环的-->
							<view class="shop_right_box_element" v-for="(item2,index2) in item.oilpaintings_arr " >
								<!-- item2 指的是每一个oilpaintings_arr里面的元素 -->
								<image :src="item2.img" mode="widthFix"></image>
								<view class="shop_right_box_element_description">
									{{item2.oilpaintings_description}}
									
								</view>
								<view class="price">
									￥{{item2.price}}
									
								</view>
							</view>
						</view>	
				</view>
			</scroll-view>
		</view>	
		
	</view>
</template>

<script>
	import banner from "../../components/banner/banner.vue"
	export default {
		data() {
			return {
				// 定义一个数据用于存储你要让那一个标题设置棕条
				
				num:0,
				scrollintoview:"box2",
				shop_img:[
					"../../static/img/shop/shop_banner/shop_banner1.jpg",
					"../../static/img/shop/shop_banner/shop_banner2.jpg",
					"../../static/img/shop/shop_banner/shop_banner3.jpg",
					"../../static/img/shop/shop_banner/shop_banner4.jpg",
					"../../static/img/shop/shop_banner/shop_banner5.jpg",
				],
				left_right_array:
				[
					{
						title:"oilpaintings",
						oilpaintings_arr:
						[
							{
								img:"../../static/img/shop/category/oilpaintings/oilpaintings1.jpg",
								oilpaintings_description:"oilpaintings1",
								price:"29"
							},
							{
								img:"../../static/img/shop/category/oilpaintings/oilpaintings2.jpg",
								oilpaintings_description:"oilpaintings2",
								price:'120'
								
							},
							{
								img:"../../static/img/shop/category/oilpaintings/oilpaintings3.jpg",
								oilpaintings_description:"oilpaintings3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/oilpaintings/oilpaintings4.jpg",
								oilpaintings_description:"oilpaintings4",
								price:'120'
							},
						]	
					},
					{
						title:"acrylicpaintings",
						oilpaintings_arr:
						[
							{
								img:"../../static/img/shop/category/acrylicpaintings/acrylicpaintings1.jpg",
								oilpaintings_description:"acrylicpaintings1",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/acrylicpaintings/acrylicpaintings2.jpg",
								oilpaintings_description:"acrylicpaintings2",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/acrylicpaintings/acrylicpaintings3.jpg",
								oilpaintings_description:"acrylicpaintings3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/acrylicpaintings/acrylicpaintings4.jpg",
								oilpaintings_description:"acrylicpaintings4",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/acrylicpaintings/acrylicpaintings5.jpg",
								oilpaintings_description:"acrylicpaintings5",
								price:'120'
							}
							
						]
						
					},
					
					{
						title:"watercolours",
						oilpaintings_arr:
						[
							{
								img:"../../static/img/shop/category/watercolours/watercolours1.jpg",
								oilpaintings_description:"watercolours1",
								price:'120'
								
							},
							{
								img:"../../static/img/shop/category/watercolours/watercolours2.jpg",
								oilpaintings_description:"watercolours2",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/watercolours/watercolours3.jpg",
								oilpaintings_description:"watercolours3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/watercolours/watercolours4.jpg",
								oilpaintings_description:"watercolours4",
								price:'120'
							},
							
						]
						
					},
					
					{
						title:"mixedmedia",
						oilpaintings_arr:
						[
							{
								img:"../../static/img/shop/category/mixedmedia/mixedmedia1.jpg",
								oilpaintings_description:"mixedmedia1",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/mixedmedia/mixedmedia2.jpg",
								oilpaintings_description:"mixedmedia2",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/mixedmedia/mixedmedia3.jpg",
								oilpaintings_description:"mixedmedia3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/mixedmedia/mixedmedia4.jpg",
								oilpaintings_description:"mixedmedia4",
								price:'120'
							},
							
						]
						
					},
					{
						title:"spraypaint",
						oilpaintings_arr:
						[
							{
								img:"../../static/img/shop/category/spraypaint/spraypaint1.jpg",
								oilpaintings_description:"spraypaint1",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/spraypaint/spraypaint2.jpg",
								oilpaintings_description:"spraypaint2",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/spraypaint/spraypaint3.jpg",
								oilpaintings_description:"spraypaint3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/spraypaint/spraypaint4.jpg",
								oilpaintings_description:"spraypaint4",
								price:'120'
							}
							
						]
						
					},
					
					{
						title:"gouache",
						oilpaintings_arr:
						[
							
							{
								img:"../../static/img/shop/category/gouache/gouache1.jpg",
								oilpaintings_description:"gouache1",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/gouache/gouache2.jpg",
								oilpaintings_description:"gouache2",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/gouache/gouache3.jpg",
								oilpaintings_description:"gouache3",
								price:'120'
							},
							{
								img:"../../static/img/shop/category/gouache/gouache4.jpg",
								oilpaintings_description:"gouache4",
								price:'120'
							}	
						]
						
					}
					
					
				],
				
			}
		},
		methods: {
			//这里的index随便定义
			display(index){
				//index就是 你点击的那个选项的索引值
				//例如 你点击的事 第三个 index是 2
				console.log(index);
				// 点到随我就把index给num
				this.num = index; 
				// 点击某一个在shop里面的category就出现那个内容里面
				this.scrollintoview = "box"+index;
			}
		},
		// 注册组件
		components:{
			banner
			
		}
	}
</script>

<style>
	.header{
		display: flex;
		margin-top: 40rpx;
		
	}
	.shopping_cart image{
		width: 70rpx;
		height:70rpx;
		margin-left: 30rpx;
		
	}
	.search-bar {
	  width: 600rpx;
	  display: flex;
	  align-items: center;
	  padding: 15px;
	  background-color: #f8f8f8;
	  border-radius: 10px;
	  margin-bottom: 30rpx;
	}
	.shop{
		display: flex;
		
	}
	/* 在这里设置height这样才可以滚（scroll down） */
	.left{
		width: 35%;
		/* 
		 关于高度的设置可以使用 calc 函数
		 calc 是 css 的一个系统函数，用于计算我们高度不是固定的死值
		 实际的高度 = 屏幕的高度 - 你banner 图占的高度
		 屏幕的高度怎么计算
		 语法格式：
			calc（100vh - 380rpx）
			100vh 是类似于 %比的单位 只不过在计算的时候， 需要使用 vh 单位
		 */
		/* 这里还不能滚 */
		height: calc(100vh - 380rpx); 
		background-color: #E6E0DE;
	}
	.right{
		width: 65%;
		background-color: #D3C9C4 ;
		/* 左右的高度一样 */
		/* 
			使用函数的时候， 运算符两端必须有空格
		 */
		height: calc(100vh - 380rpx); 
		/* 上下左右都有边距 */
		padding: 10rpx;
		box-sizing: border-box; /* 确保padding不会影响宽度 */
	 	/* border: 1rpx solid green; */ 
	}
	
	.shop_right_title{
		height: 60rpx;
		font-weight: bold;
		font-family: 'Times New Roman';
		font-size: 30px;
		line-height: 60rpx;
		
	}
	
	.shop_right_box{
		/* border: 1px solid red; */
		background-color: #fff;
		padding: 10rpx;
		display: flex;
		/* 让子元素自动换行 */
		flex-wrap: wrap;
	/* 	border: 1rpx solid green; */
		
	}
	
	.shop_right_box_element{
		width: 45%;
		
		/* border: 1rpx solid red; */
		  margin: 15rpx 0 10rpx 15rpx; /* Add extra margin to create space between images */
		  
		
	}
	.shop_right_box_element image{
		width: 100%; /* 最大宽度为容器宽度 */
		/* border: 5rpx solid rebeccapurple; */
		
		
		
	}
	.shop_right_box_element_description{
		text-align: center;
		font-size: 30rpx;
		font-family: 'Times New Roman', Times, serif;
		/* Add this to make the text wrap to the next line */
		  word-break: break-all;
		  /* Add this to make the text vertically centered */
		  align-self: center;
	}
	
	.price{
		color:red;
		text-align: center;
	}
	
	
	
	
	.shop_left_category{
		height: 80rpx; 
		background-color: #fff;
		text-align: center;
	 	line-height:80rpx ;
		border-bottom: 1px solid #765B48;
		font-size: 20px;
		font-family: 'Times New Roman', Times, serif;
		/* 如果放在这里所有的左边category都有棕条，我们不要所有都有只想要点击的时候才有
		 所以就想让呢个元素有就放在那个元素所以才开始有active
		 想点击的时候有所以用循环
		 */
		/* border-left: 6px solid #765B48; */
	}
	/* 定义一个选中会有棕条的样式 */
	/* 因为想点击的时候有background所以用background */
	.active{
		border-left:  10rpx solid #765B48;
		background-color: #E6E0DE ;
	}

</style>
