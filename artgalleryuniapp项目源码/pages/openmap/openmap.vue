<template>
	<view>
		<map class="mymap" scale="15"   :markers="arr"  latitude="41.758794" longitude="123.463569"></map>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				arr:[
						{
							latitude:"41.758794" ,
							longitude:"123.463569",
							iconPath:'/static/img/location.png'
						}
				    ]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.mymap{
		width: 100%;
		height: 500rpx;
	}

</style>
