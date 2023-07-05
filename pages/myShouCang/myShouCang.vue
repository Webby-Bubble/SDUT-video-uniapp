<template>
	<view class="myShouCangAll">
		<back-menu title="我的收藏"></back-menu>
		<view style="padding-top: 120px;">
			<!-- 没有收藏的图标 -->
			<view class="myVideoContent">
				<!-- 没有作品的图标 自适应居中css position:absolute; left:0; rigth:0; margin:auto -->
				<view style="position: absolute;top: 30%;left: 0;right: 0;margin: auto;text-align: center;">
					<view style="font-size: 110px;color: #b8d1e6;" class="iconfont icon-lab-kuqi"></view>
					<view style="margin-top: 30px;color: #79828a;">还没有收藏过任何影视呢，快去观影吧</view>
					<button style="margin-top: 30px;background-color: rgb(93 185 199);color: white;border-radius: 25px;width: 50%;"
						@click="toAddVideo()">去观影</button>
				</view>
			</view>
			<!-- 滑动删除 -->
			<u-swipe-action v-if="true" v-for="(video,index) in shouCangList" :key="index" style="margin-bottom: 10px;">
				<u-line></u-line>
				<u-swipe-action-item :options="options">
					<view style="height: 120px;">
						<u-row>
							<u-col :span="4">
								<image :src="video.videoCover"
									style="height: 100px;width: 100%;margin-left: 20px;margin-top: 10px;border-radius: 10px;">
								</image>
							</u-col>
							<u-col :span="8" style="margin-left: 30px;">
								<view style="color: #5a5c5e;font-size: 16px;margin-top: -20px;width: 200px;">
									{{video.videoTitle}}</view>
								<view style="font-size: 13px;color: #888c90;margin-top: 10px;">{{video.publishTime}}
								</view>
								<view
									style="display: flex;justify-content: space-between;position: absolute;bottom: 15px;width: 66%;">
									<text class="iconfont icon-shipin"><text
											style="font-size: 10px;color: #9fa2a4;margin-left: 5px;">23.2万</text></text>
									<text class="iconfont icon-xiaoxi"></text>
									<text class="iconfont icon-24gf-ellipsisVertical" style="margin-right:40px"></text>
								</view>
							</u-col>
						</u-row>
					</view>
				</u-swipe-action-item>
				<u-line></u-line>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	import backMenu from '@/componets/backMenu/backMenu.vue'
	export default {
		components: {
			backMenu
		},
		data() {
			return {
				options: [{
					text: '取消收藏'
				}],
				shouCangList: []
			}
		},
		methods: {
			toAddVideo(){
				uni.switchTab({
					url:'/pages/login/login'
				})
			},
			queryAllShouCang() {

				uni.request({
					url: this.path + '/video/queryMyShouCang',
					data: {
						userId: JSON.parse(uni.getStorageSync('user')).id
					},
					success: res => {
						this.shouCangList = res.data.data.rows
					}
				})
			}
		},
		onLoad() {
			this.queryAllShouCang()
		}
	}
</script>

<style scoped>

</style>
