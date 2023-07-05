<template>
	<view class="videoInfoHeader">
		<view class="iconfont icon-houtui" style="font-size: 18px;padding-top: 10px;color: white;" @click="comeback()">返回</view>
		<view class="title">{{title}}</view>
		<view  class="shouye" @click="comebackHome()">
			<view class="iconfont icon-shouye" style="font-size: 22px;color: white;"></view>
			<view style="font-size: 10px;color: white;text-align: center;margin-left: -2px;" >首页</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:String,
			showHome:Boolean
		},
		data(){
			return{
				
			}
		},
		methods:{
			comeback(){
				uni.navigateBack({
					delta:1
				})
			},
			comebackHome(){
				uni.switchTab({
					url: '/pages/login/login',
				})
			}
		}
	}
</script>

<style>
	@import url("backMenu.css");
</style>
