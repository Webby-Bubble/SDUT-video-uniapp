<template>
	<view class="homeHeader">
	  <view class="leftLogo">
		 <!-- <view class="iconfont icon-iconguifanbeifen" style="font-size: 30px;color: #02ABE9;margin-top: 9px;"></view> -->
		  <image src="../../static/img/164793461631723.png" style="width: 145px; height: 50px;margin-top: 2px;"></image>
	  </view>
	  <view class="queryInfo" @click="toQueryIndex()">
		<u--input
				readonly
				placeholder="请输入影视名称"
						v-model="videoName"
				suffixIcon="search"
				sufffixIconStyle="font-size: 22px;color: #909399"
				style="border-radius: 20px;height: 20px;padding: 4px 9px;font-size: 18px;"
		></u--input>
	  </view>
	   <!-- <view class="queryHz" @click="toQueryVideos()">搜索</view> -->
	   <view class="iconfont icon-shizhong shizhong"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				videoName:''
			}
		},
		methods:{
			toQueryIndex(){
				uni.navigateTo({
					url:"/pages/queryIndex/queryIndex"
				})
			},
			toQueryVideos(){
				if(this.videoName != ''){
					uni.navigateTo({
						url:'../../pages/queryVideos/queryVideos?videoName=' + this.videoName,
					})
				}else{
					uni.showToast({
						title:'请输入要搜索的影视名称',
						position:'center',
						duration:3000,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style scoped>
	@import url("homeHeader.css");
</style>
