<template>
	<view class="myVideo">
		<backMenu title="我的作品"></backMenu>
		<view class="myVideoContent">
			<!-- 没有作品的图标 自适应居中css position:absolute; left:0; rigth:0; margin:auto -->
			<view  v-if="myVideoList.length == 0" style="position: absolute;top: 30%;left: 0;right: 0;margin: auto;text-align: center;">
				 <view style="font-size: 110px;color: #b8d1e6;" class="iconfont icon-lab-kuqi"></view>
				 <view style="margin-top: 30px;color: #79828a;">还没有发布过作品快去创作吧</view>
				 <button style="margin-top: 30px;background-color: rgb(93 185 199);color: white;;border-radius: 25px;width: 50%;" @click="toAddVideo()">去创作</button>
			</view>
			
			<!-- 作品列表 -->
			<view class="myVideoContentOut">
				<u-row style="display: flex;flex-wrap: wrap;" :gutter="10">
					<u-col :span="4" v-for="(shortVideo,index) in myVideoList" :key="index">
						<view style="position: relative;">
							<!-- 违规或者待审核的视频加蒙版 -->
							<view  @click="toShortVideoDetails(shortVideo)" class="zhezhao" v-if="shortVideo.videoStatus == 1 || shortVideo.videoStatus == 3">
								<view class="statusHz" v-if="shortVideo.videoStatus == 1">待审核</view>
								<view class="statusHz" v-if="shortVideo.videoStatus == 3">违规</view>
							</view>
							<view style="position: relative;" @click="toShortVideoDetails(shortVideo)">
								<image class="myVideoCover" :src="shortVideo.videoCover"></image>
								<view class="bofangCount">
									<view class="iconfont icon-dianzan"></view>
									<view style="margin-left: 5px;;margin-top: -2px;">{{shortVideo.talkeAndReplyCount}}</view>
								</view>
							</view>
							
						</view>
						
					</u-col>
				</u-row>
				
				<u-divider style="margin-top: 50px;" text="暂时没有更多了"></u-divider>
			</view>
		</view>
	</view>
</template>

<script>
	import backMenu from '@/componets/backMenu/backMenu.vue'
	export default{
		components:{
			backMenu
		},
		data(){
			return{
				myVideoList:[],
				userId:''
			}
		},
		methods:{
			toShortVideoDetails(shortVideo){
				uni.navigateTo({
					url:'/pages/shortVideo/shortVideoDetails/shortVideoDetails?shortVideo='+encodeURIComponent(JSON.stringify(shortVideo))
				})
			},
			toAddVideo(){
				uni.reLaunch({
					url:'/pages/addVideo/addVideo'
				})
			},
			queryAllShortVideoList(){
				uni.request({
					url:this.videoPath + '/video/queryAllMyShortVideoList',
					method:'GET',
					data:{userId:this.userId},
					success: (res) => {
						this.myVideoList = res.data.data
					}
				})
			}
		},
		onLoad(option) {
			this.userId = option.userId
			this.queryAllShortVideoList()
		}
	}
</script>

<style>
	@import url("myVideo.css");
</style>
