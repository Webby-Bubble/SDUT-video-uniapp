 <template>
	<view class="videoBody">
		<view class="videoAll">
			<back-menu></back-menu>
			<view style="padding-top: 95px;margin-bottom: 10px;">
				<u-tabs :current="tabsCurrent" style="background-color: white;border-radius: 8px;width: 96%;margin-left: 2%;"  :list="tabs" @click="clickTabs"></u-tabs>
			</view>
			
			<view class="videoDetailsCard">
				<view style="position: relative;">
					<image :src="video.videoCover" style="width: 240rpx;height: 300rpx;margin-top: 5px;margin-left: 5px;border-radius: 10px;"></image>
				
					<button @click="toVideoBpay(video)" class="playButton"><view class="iconfont icon-bofang" style="font-size: 13px;">立即播放</view></button>
				</view>
				<view class="videoCardRight">
					<view style="font-size: 20px;color: #363737;margin-top: 3px;font-weight: 600;">{{video.videoTitle}}</view>
					<view style="font-size: 13px;">
						<view style="margin-top: 5px;">类型: {{video.videoTypes}}</view>
						<view style="margin-top: 5px;">导演: {{video.director}}</view>
						<view style="margin-top: 5px;">演员:{{video.stars}}</view>
						<view style="margin-top: 5px;margin-bottom: 5px;">更新: {{video.publishTime}}</view>
					</view>
					
				</view>
			</view>
			<!-- 电视剧选集 -->
			<view class="dianShiJu" v-if="video.videoChildrenList.length != 0">
				<view style="font-size: 18px;margin-left: 5px;
				margin-bottom: 15px;color: #616365;" v-if="video.videoChildrenList.length != 0">电视剧选集</view>
				<view style="display: flex;flex-direction: row;flex-wrap: wrap;margin-left: 5px;margin-bottom: 30px;">
					<view v-for="(children ,index) in video.videoChildrenList" :key="index" style="margin-right: 10px;">
						<button  @click="toVideoPlayIndex(children.videoAnthology)" style="font-size: 10px;background-color: white;">第{{children.videoAnthology<=9?'0'+children.videoAnthology:children.videoAnthology}}集</button>
					</view>
				</view>
				
			</view>
		</view>
		<view class="videoContent">
			<view style="display: flex;align-items: center;height: 20px;margin-top: 5px;">
				<view class="asideLine" style="margin-top: 5px;"></view>
				<view style="font-size: 18px;color: #616365;margin-top: 5px;margin-left: 5px;">剧情介绍</view>
			</view>
			
			<hr style="width: 350px;margin-left: 5px;margin-top: 14px;">
			<p style="margin: 8px;">{{video.videoContent}}</p>
		</view>
		<!-- 评论的显示区域 -->
		<u-popup  :show="showTalkeBottom" mode="bottom" :round="20" :closeable="true"  @close="closeTalke()" @open="openTalke()">
			<view style="height: 500px;">
				<view style="text-align: center;font-weight: bolder;margin-top: 12px;">全部评论</view>
				<hr style="margin-top: 10px;color:#0000003d">
				<!-- 没有评论的时候展示 -->
				<view>
					<view class="iconfont icon-xiaoxi"
					 style="font-size: 60px;margin-left: 150px;margin-top: 25px;color:#c5c8cb ;"></view>
					<view style="margin-left: 75px;margin-top: 20px;color: #55585a;">还没有人评论，点击抢沙发~</view>
					<button class="talkeButton">立即评论</button>
				</view>
				<!-- <u-empty
					mode="message"
					icon="iconfont icon-xiaoxi">
				</u-empty> -->
			</view>
			
			
		</u-popup>
		<!-- 底部视频评论区域 -->
		<!-- <view class="videoTalkeBottom">
			<view class="iconfont icon-houtui" @click="comeback()" style="font-size: 20px;margin-top: 7px;margin-left: 20px;"></view>
			<view>
				<input class="talkeInput" type="text" 
				 placeholder="发表神评妙论..." disabled="true" @click="talkeInput()" placeholder-style="color:black;font-size:12px;padding-left:20px"/>
			</view>
			<view class="talkeBottomIcon" @click="talkeInput()">
				<text class="iconfont icon-xiaoxi" style="font-size: 20px;"></text>
				<text class="xiaoxiIcon">抢沙发</text>
			</view>
			<view class="talkeBottomIcon" @click="toShouCang()"><text class="iconfont icon-shoucang"  style="font-size: 20px;"></text></view>
		</view> -->
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
				isDianShiJu:true,
				showTalkeBottom:false,
				tabsCurrent:'',
				video:{
					id:'',
					videoTitle:'',
					videoCover:'',
					videoPath:'',
					videoTypes:'',
					director:'',
					stars:'',
					publishTime:'',
					videoKind:'',
					videoContent:'',
					videoChildrenList:[]
				},
				tabs: [{
						name: '电影',
					}, {
						name: '电视剧',
					}, {
						name: '综艺'
					}, {
						name: '动漫'
				}]
			}
		},
		methods:{
			toVideoPlayIndex(videoPath){
				let video = {videoPath:videoPath}
				uni.navigateTo({
					url:'/pages/videoInfo/videoPlay/videoPlay?video=' + encodeURIComponent(JSON.stringify(video))
				})
			},
			clickTabs(e){
				let videoKind = e.index + 1
				uni.navigateTo({
					url:'/pages/videoTypeDetails/videoTypeDetails?videoKind='+videoKind
				})
			},
			toVideoBpay(video){
				
				uni.navigateTo({
					url:'/pages/videoInfo/videoPlay/videoPlay?video=' + encodeURIComponent(JSON.stringify(video))
				})
			},
			talkeInput(){
				this.showTalkeBottom = true
			},
			comeback(){
				uni.navigateBack({
					delta:1
				})
			},
			closeTalke(){
				this.showTalkeBottom = false
			},
			
			
		},
		// 页面跳转传递对象参数需要使用 JSON.parse(decodeURIComponent(option.video)) 转换
		onLoad(option) {
			this.video = JSON.parse(decodeURIComponent(option.video))
			this.tabsCurrent = this.video.videoKind -1
			
		}
	}
</script>

<style scoped>
	@import url("@/pages/videoInfo/videoInfo.css");
</style>
