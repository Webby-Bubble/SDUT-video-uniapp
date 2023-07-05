<template>
	<view class="shortVideoDetails">
		<view style="height: 100%;">
			<iframe :src="shortVideoForm.videoPath" height="100%" width="100%" frameborder="0"></iframe>
		</view>
		
		<!-- 返回 -->
		<view class="backClass1" @click="goBack()">
			<view class="iconfont icon-houtui"></view>
			<view>返回</view>
		</view>
		<!-- 右侧功能 -->
		<view class="optionClass">
			<view class="optionOneOut">
				<view class="avatarOut">
					<image class="userAvarta" :src="shortVideoForm.userPic"></image>
				</view>
			</view>
			<view class="optionOneOut" @click="test()">
				<view :style="shortVideoForm.confirmLike?' font-size: 30px;color: #f7226d':' font-size: 30px;color: white;'" class="iconfont icon-dianzan1"></view>
				<view style="font-size: 10px;color: white;">{{shortVideoForm.likeCount}}</view>
			</view>
			<view class="optionOneOut">
				<view style="font-size: 30px;color: white;" class="iconfont icon-pinglun"></view>
				<view style="font-size: 10px;color: white;">{{shortVideoForm.talkeAndReplyCount}}</view>
			</view>
			<view class="optionOneOut">
				<view style="font-size: 30px;color: white;" class="iconfont icon-shoucang" @click="shouCang()"></view>
				<view></view>
			</view>
			<view class="optionOneOut"> 
				<view style="font-size: 30px;color: white;" class="iconfont icon-arrow-"></view>
				<view></view>
			</view>
		</view>
		
		<!-- 标题内容 -->
		<view class="shortVideoTitleAndUserName" >
			<view style="color: white;font-weight: bolder;">@{{shortVideoForm.userName}}</view>
			<view style="color: white;margin-top: 10px;font-size: 14px;width: 300px;">{{shortVideoForm.videoContent}}</view>
		</view>
	</view>
</template>

<script>
	export	default{
		data(){
			return{
				shortVideoForm:{
					
				}
			}
		},
		methods:{
			test(){
				console.log("==========");
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(option) {
			this.shortVideoForm = JSON.parse(option.shortVideo || '{}')
		}
	}
	
</script>

<style scoped>
	@import url("shortVideoDetails.css");
</style>