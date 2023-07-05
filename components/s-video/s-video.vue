<template>
	<view class="screen-swiper-box" :style="{height:height +'px'}">
		<swiper v-show="!autoplay" class="screen-swiper" @change="change" indicator-dots="true" circular="true" :autoplay="!autoplay"
			indicator-active-color="#71C1F6" indicator-color="#ffffff" interval="5000" duration="500" :indicator-dots="false">
			<swiper-item v-for="(item,index) in outsidePicturesList" :key="index">
				<image class="swiperImage" :src="item.url" mode="scaleToFill" v-if="item.type==1"></image>
				<view class="video_box" v-else>
					<image src="./vplay.jpg" @click="showVideo(item)" ></image>
				</view>
			</swiper-item>
		</swiper>
		<view v-if="autoplay" class="video">
			<video class="MyVideo" id="myVideo" :src="videoUrl" objectFit="cover" @pause="pause" @ended="pause" :controls="true"
				:show-fullscreen-btn="false" :autoplay="true">
			</video>
		</view>
		<view class="u-swiper-indicator" :style="{
				bottom: '12rpx',
				right:'12px',
				padding: '24rpx'
			}">
			<block>
				<view class="u-indicator-item-number">{{ current + 1 }}/{{ outsidePicturesList.length }}</view>
			</block>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			height: {
				type: Number
			},
			data: {
				type: Array
			}
		},
		data() {
			return {
				autoplay: false,
				videoContext:null,
				outsidePicturesList:[],
				videoUrl: '',
				current:0
			}
		},
		created() {
			if (this.data && this.data.length > 0) {
				const outsidePicturesList = []
				this.data.forEach(v => {
					let fileExtension = null
					let type = null
					fileExtension = v.substring(v.lastIndexOf('.') + 1)
					fileExtension = fileExtension.toLowerCase()
					if (
						fileExtension === '3gp' ||
						fileExtension === 'mp4' ||
						fileExtension === 'rmvb' ||
						fileExtension === 'mov' ||
						fileExtension === 'avi' ||
						fileExtension === 'm4v'
					) {
						type = 2
					} else if (
						fileExtension === 'bmp' ||
						fileExtension === 'gif' ||
						fileExtension === 'jpg' ||
						fileExtension === 'jpeg' ||
						fileExtension === 'png'
					) {
						type = 1
					} else {
						return false
					}
					const data = {
						url: v,
						type: type
					}
					outsidePicturesList.push(data)
				})
				this.outsidePicturesList = outsidePicturesList
			} else {
				this.outsidePicturesList = []
			}
		},
		methods: {
			change(val) {
				this.current = val.detail.current
			},
			// 轮播图事件
			showVideo(val) {
				this.videoUrl = val.url
				this.videoContext = uni.createVideoContext('myVideo')
				this.videoContext.play();
				this.autoplay = true;
			},
			pause() {
				this.videoContext = null
				this.autoplay = false;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.screen-swiper-box {
		position: relative;
		width: 100%;
		.video {
			height: 100%;
			width: 100%;
			position: absolute;

			.MyVideo {
				width: 100%;
				position: absolute;
				height: 100%;

				.videoClose {
					height: 40rpx;
					width: 40rpx;
					position: absolute;
					right: -1rpx;
					z-index: 99999;
					background-repeat: no-repeat;
					background-size: 100% 100%;
				}
			}


		}

		.screen-swiper {

			width: 100%;
			position: absolute;
			height: 100%;

			.swiperImage {
				width: 100%;
				position: absolute;
				height: 100%;
			}


		}
	}
	.u-swiper-indicator {
		padding: 0 24rpx;
		position: absolute;
		box-sizing: border-box;
		z-index: 1;
	}
	.u-indicator-item-number {
		padding: 6rpx 16rpx;
		line-height: 1;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 100rpx;
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}
	.video_box {
		width: 100%;
		height: 100%;
		background-color: #f6f6f6;
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 200rpx;
			height: 200rpx;
		}
	}
</style>
