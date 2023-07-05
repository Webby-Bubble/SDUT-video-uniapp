<template>
	<view class="shortSearchDetails">
		<view class="queryHeaderClass">
			<view class="queryIndex">
				<view style="font-size: 20px;" class="iconfont icon-houtui" @click="comeBack()"></view>
				<view class="queryInputClass">
					<u--input v-model="shortVideoName" style="border-radius: 30px;background-color: #eaecf2"
						:placeholder="shortVideoName" prefixIcon="search" placeholderStyle="text-align:center"
						suffixIconStyle="color: #909399;font-size:19px"></u--input>
				</view>
				<view style="font-size: 15px;" @click="queryAllShortVideoListByName()">搜索</view>
			</view>
		</view>
		
		<!-- 搜索列表内容 -->
		<view class="searchListOut">
			<view v-for="(item,index) in searchShortVideoList" :key="index">
				<view class="avatarAndName">
					<view class="searchAvatar">
						<u-avatar size="35" :src="item.userPic"></u-avatar>
					</view>	
					<view class="avatarname">{{item.userName}}</view>
				</view>	
				<view class="titleContent">
					{{item.videoContent}}
				</view>
				
				<view class="videoPlayClass">
					<iframe style="width: 100%;height: 200px;;border-radius: 8px;" :src="item.videoPath" frameborder="0"></iframe>
					<view @click="toShortVideeoDetails(item)" class="coverVideo" ></view>
				</view>
				
				<view style="display: flex;align-items: center;margin-top: 5px;margin-bottom: 30px;">
					<view class="iconFlexClass">
						<view class="iconfont icon-dianzan searchIcon"></view>
						<view class="">{{item.likeCount}}</view>
					</view>
					<view class="iconFlexClass">
						<view class="iconfont icon-pinglun searchIcon"></view>
						<view class="">{{item.talkeAndReplyCount}}</view>
					</view>
					<view class="iconFlexClass">
						<view class="iconfont icon-shoucang searchIcon"></view>
						<view class="">4600</view>
					</view>
					<view class="iconFlexClass">
						<view class="iconfont icon-arrow- searchIcon" ></view>
						<view class="">4600</view>
					</view>
				</view>
			</view>
			
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shortVideoName:'',
				searchShortVideoList:[]
			}
		},
		methods: {
			comeBack(){
				uni.navigateBack({
					delta:1
				})
			},
			toShortVideeoDetails(video){
				uni.navigateTo({
					url:'/pages/shortVideo/shortVideoDetails/shortVideoDetails?shortVideo='+encodeURIComponent(JSON.stringify(video))
				})
			},
			queryAllShortVideoListByName(){
				uni.request({
					url:this.videoPath + '/video/queryAllShortVideo',
					method:'GET',
					data:{videoContent:this.shortVideoName},
					success: (res) => {
						this.searchShortVideoList =  res.data.data.rows
					}
				})
			}
		},
		onLoad(option) {
			this.shortVideoName = option.shortVideoName
			this.queryAllShortVideoListByName()
		}
	}
</script>

<style scoped>
	@import url("shortSearchDetails.css");
</style>