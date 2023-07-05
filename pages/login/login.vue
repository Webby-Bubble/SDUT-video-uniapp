<template>
	<view class="loginAll">
		<!-- 首页头部组件 -->
		<home-header></home-header>
		<!-- 轮播 -->
		<view class="swaperHead">
			<!-- <swiper style="height: 200px;" :autoplay="true" :interval="6000" :circular="true" @change="swaperChange">
				  <swiper-item v-for="video in swaperList" :key="video.id">
					  <image :src="video.videoCover" style="width: 100%;" @click="toVideoInfo(video)"></image>
				  </swiper-item>
			  </swiper>
			  
			  <view class="swaperFoot">
			  	<view style="width: 80%;color: white;padding-top: 6px;margin-left: 25px;">
					{{swaperTitle}}
				</view>
			  	<view style="width: 20%;display: flex;text-align: center; 10px;padding-top: 15px;">
					<view v-for="i in 3" :key="i" style="width: 5px;height: 5px;background-color: white;border-radius:10px;margin-left: 5px;" ></view>
				</view>
			  </view> -->
			<u-swiper :list="swaperList" @change="e => current = e.current" @click="clickSwiper" :autoplay="true"
				height="200px" keyName="image" duration="1000" interval="4000" showTitle circular
				indicatorStyle="right:20px">
				<view slot="indicator" class="indicator">
					<view class="indicator__dot" v-for="(item, index) in swaperList" :key="index"
						:class="[index === current && 'indicator__dot--active']">
					</view>
				</view>
			</u-swiper>
		</view>

		<!-- 滚动播报 -->
		<!-- <view>
			<u-notice-bar :text="text1"></u-notice-bar>
		  </view> -->
		<!-- 视频分类 -->
		<u-row class="videoType">
			<u-col v-for="item in videoTypes" :key="item.vidoeType" :span="3" style="position: relative;">
				<view class="videoTypeInBj" @click="toVideoTypeDetails(item.vidoeType)">
					<view>
						<view :class="item.videoTypeIcon" id="videoTypeIcon" :style="item.videoTypeStyle"></view>
					</view>
					<view style="text-align: center;font-size: 13px;">{{item.videoTypeTitle}}</view>
				</view>
			</u-col>
		</u-row>


		<!-- 为你推荐组件 -->
		<cards title="最新电影" :videoKind="1"></cards>
		<cards title="最新电视剧" :videoKind="2"></cards>
		<cards title="最新综艺" :videoKind="3"></cards>
		<cards title="最新动漫" :videoKind="4"></cards>
		<view style="height: 30px;">
			<u-divider text="没有更多数据啦"></u-divider>
		</view>

		
	</view>

</template>

<script>
	import homeHeader from '../../componets/homeHeader/homeHeader.vue'
	import cards from '@/componets/refrash/refrash.vue';
	export default {
		name: 'login',
		components: {
			cards,
			homeHeader
		},
		data() {
			return {
				
				text1: '该软件还在测试开发中，如有观影不便请谅解！',
				title: 'Hello',
				current: 0,
				swaperList: [],
				swaperTitle: '',
				videoTypes: [{
						"vidoeType": 2,
						"videoTypeIcon": "iconfont icon-dianshiju",
						"videoTypeTitle": "电视剧",
						"videoTypeStyle": "background-image: linear-gradient(to bottom,rgb(196 243 231),rgb(51 209 168));"
					},
					{
						"vidoeType": 1,
						"videoTypeIcon": "iconfont icon-dianying",
						"videoTypeTitle": "电影",
						"videoTypeStyle": "background-image: linear-gradient(rgb(184 225 245), rgb(47 152 187))"
					},
					{
						"vidoeType": 3,
						"videoTypeIcon": "iconfont icon-zongyi",
						"videoTypeTitle": "综艺",
						"videoTypeStyle": "background-image: linear-gradient(rgb(248 237 225), rgb(230 140 43))"
					},
					{
						"vidoeType": 4,
						"videoTypeIcon": "iconfont icon-aidongman",
						"videoTypeTitle": "动漫",
						"videoTypeStyle": "background-image: linear-gradient(rgb(242 243 243), rgb(225 44 68))"
					},
				]
			}
		},

		methods: {
			clickSwiper(e) {
				uni.navigateTo({
					// 页面跳转 传递对象参数需要使用 encodeURIComponent(JSON.stringify(video)) 转化
					url: '/pages/videoInfo/vidoeInfo?video=' + encodeURIComponent(JSON.stringify(this.swaperList[e]
						.video))
				})
			},
			swaperChange(e) {
				this.current = e.detail.current
				this.swaperTitle = this.swaperList[this.current].videoTitle
			},
			toVideoTypeDetails(videoType) {
				uni.navigateTo({
					url: '/pages/videoTypeDetails/videoTypeDetails?videoKind=' + videoType
				})
			},
			queryRandomVideos() {
				let pageNum = parseInt(Math.random() * 20)
				uni.request({
					url: this.videoPath + '/video/getAllVideos',
					data: {
						pageNum: pageNum,
						pageSize: 10
					},
					success: res => {
						res.data.data.rows.forEach(item => {
							this.swaperList.push({
								image: item.videoCover,
								title: item.videoTitle,
								video: item
							})
						})
					}
				})
			},
			toVideoInfo(video) {
				uni.navigateTo({
					url: '/pages/videoInfo/vidoeInfo?video=' + encodeURIComponent(JSON.stringify(video))
				})
			}

		},
		onLoad() {
			this.queryRandomVideos()
		},
		mounted() {
			this.$nextTick(() => {
				this.$lottie.loadAnimation({
					container: document.getElementById(`lottie_box`), // 包含动画的dom元素
					renderer: "svg", // 渲染出来的是什么格式
					loop: true, // 循环播放
					autoplay: true, // 自动播放
					animationData: require(`@/static/Rain.json`), // 动画json的本地路径
					// path:''//网络json地址, 选择 animationData 后，则不用path了，
				});

				this.$lottie.loadAnimation({
					container: document.getElementById(`typhoon`), // 包含动画的dom元素
					renderer: "svg", // 渲染出来的是什么格式
					loop: true, // 循环播放
					autoplay: true, // 自动播放
					animationData: require(`@/static/typhoon.json`), // 动画json的本地路径
					// path:''//网络json地址, 选择 animationData 后，则不用path了，
				});
			});
		}
	}
</script>

<style scoped lang="scss">
	@import url("login.css");

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}
</style>
