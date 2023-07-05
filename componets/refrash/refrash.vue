<template>
		<view class="refrashOut">
			<view style="display: flex;justify-content: space-between;margin-top: 10px;margin-bottom: 10px;padding-top: 10px;">
				<view style="display: flex;align-items: center;">
					<view class="asideLine"></view> 
 					<text style="font-size: 15px;font-weight: 600;margin-left: 10px;">{{title}}</text>
				</view>
				
				<text style="margin-right: 10px;font-size: 15px;color: #808080;" @click="clickMore()">更多</text>
			</view>	
			<!-- <u-row style="flex-wrap: wrap;">
				<u-col class="videoCard" :span="3.65" v-for="video in videoList" :key="video.id">
					<view class="pic">
						<image :src="video.videoCover" @click="showVideoDetails(video)" style="width: 100%;height: 125px;border-radius: 5px;"></image>
						<view class="picBottom">
							<view style="position: absolute;bottom: 5px;right: 6px;color: #f78217;">{{video.doubanScore}}</view>
						</view>
					</view>
										
					<text style="font-size: 14px;">{{video.videoTitle.length >=8?(video.videoTitle.substring(0,6)) + '...':video.videoTitle }}</text>
					<view style="display: flex;justify-content: space-between;margin-top: 3px;">
						<text style="font-size: 14px;color: #8b8a8a;">{{video.videoTypes.split(",")[0]}}</text>
						<view class="iconfont icon-24gf-ellipsisVertical" @click="showWeiGui(video)"></view>     
					</view>
				</u-col>
			</u-row> -->
			<view class="videoListCard">
				<view class="videoCardBorder"  v-for="video in videoList" :key="video.id" style="width: 30%;">
					<view class="pic">
						<image :src="video.videoCover" @click="showVideoDetails(video)" style="width: 100%;height: 125px;border-radius: 5px;"></image>
						<view class="picBottom">
							<view style="position: absolute;bottom: 5px;right: 6px;color: #f78217;">{{video.doubanScore}}</view>
						</view>
					</view>
										
					<text style="font-size: 14px;">{{video.videoTitle.length >=8?(video.videoTitle.substring(0,6)) + '...':video.videoTitle }}</text>
					<view style="display: flex;justify-content: space-between;margin-top: 3px;margin-bottom: 5px;">
						<text style="font-size: 14px;color: #8b8a8a;">{{video.videoTypes.split(",")[0]}}</text>
						<view class="iconfont icon-24gf-ellipsisVertical" @click="showOption(video)"></view>     
					</view>
				</view>
			</view>
			
			    
			<view style="text-align: center;color: rgb(21 147 171) ;margin-top: 20rpx;margin-bottom: 20px;" v-if="showRefresh" @click="refresh()"  class="iconfont icon-shuaxin">
				<text style="margin-left: 5px;">换一批</text>
			</view>
			
			<!-- 不喜欢和违规举报 -->
			<!-- <view>
				<u-popup round="15"  :show="showDangerAndNotLike" closeable @close="showDangerAndNotLike = false">
					<view style="text-align: center;margin-top: 20px;">违规举报</view>
					<view class="dangerTitleClass">
						<u-tag color="#82daec" text="影视名称" type="success" plain></u-tag>
						<view class="dangerTitle">{{video.videoTitle}}</view>
					</view>
					<view class="dangerAndNotLikeClass">
						<view class="dangerContentClass">
							 <u--input
							    placeholder="请输入违规内容"
							    border="surround"
							    v-model="dangerContent"
							  ></u--input>
							  <u-button style="width: 90px;
								margin-left: 10px;
								background-color: #efcddb;
								border-radius: 20px;">举报</u-button>
						</view>
					</view>
				</u-popup>
				
			</view> -->
			<u-popup round="15" :show="showBottomOtherOption" mode="bottom" :closeable ="true" @close="showBottomOtherOption = false">
				<view class="bottomOtherOptionClass">
					<view class="optionHzClass">功能选项</view>
					<u-line></u-line>
					<view style="display: flex;margin: 10px;">
						<view class="optionOut" v-for="(item,index) in optionList" :key="index">
							<view class="optionIconOut" @click="toPage(item.toPage)">
								<view :class="item.icon"></view>
							</view>
							<view class="reportHz">{{item.title}}</view>
						</view>
					</view>
					
				</view>
			</u-popup>
		</view>
	
</template>

<script>
	
	export default {
		name:'card',
		props:{
			title:String,
			videoKind:Number,
			showRefresh:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				//功能选项集合
				optionList:[
					{icon:'iconfont icon-jubao optionIcon',title:'举报',toPage:'report'},
					{icon:'iconfont icon-fankui optionIcon',title:'播放反馈',toPage:null},
					{icon:'iconfont icon-buganxingqu optionIcon',title:'不感兴趣',toPage:null}
				],
				showBottomOtherOption:false,
				dangerContent:'',
				video:{
					
				},
				showDangerAndNotLike:false,
				videoList:[],
				pageNum:1,
				optionVideo:{}
			}
		},
		methods:{
			showOption(video){
				//将段视频数据存储后传到举报界面
				this.optionVideo.id = video.id
				this.optionVideo.director = video.director
				this.optionVideo.videoTitle = video.videoTitle
				this.showBottomOtherOption = true
			},
			toPage(page){
				console.log(this.optionVideo)
				if(uni.getStorageSync('user')){
					if(page !== null){
						uni.navigateTo({
							url:"/pages/report/" + page + "?video="+encodeURIComponent(JSON.stringify(this.optionVideo))+'&userId='+JSON.parse(uni.getStorageSync('user')).id
						})
					}else{
						uni.$u.toast('功能暂未开放~')
					}
				}else{
					uni.$u.toast('请您先登录~')
				}
				
			},
			showWeiGui(video){
				this.showDangerAndNotLike = true
				this.video = video
			},
			clickMore(){
				if(uni.getStorageSync('user') != "" && JSON.parse(uni.getStorageSync('user')) != undefined){
					uni.navigateTo({
						url:'/pages/videoTypeDetails/videoTypeDetails?videoKind='+this.videoKind
					})
				}else{
					uni.showToast({
						title:"亲~ 先去登录呀",
						icon:"none",
						duration:2000
					})
				}
				
			},
			refresh(){
				this.getAllVideos(++this.pageNum)
			},
			showVideoDetails(video){
				
				uni.navigateTo({
					// 页面跳转 传递对象参数需要使用 encodeURIComponent(JSON.stringify(video)) 转化
					url:'/pages/videoInfo/vidoeInfo?video='+encodeURIComponent(JSON.stringify(video))
				})
			},
			getAllVideos(pageNum){
				let role = 0
				if(uni.getStorageSync('user') != ''  && uni.getStorageSync('user') != 'undefined'){
					role = JSON.parse(uni.getStorageSync('user')).role
				}
				uni.request({
					url:this.videoPath + '/video/getAllVideos',
					data:{
						pageNum:pageNum,
						videoKind:this.videoKind,
						role:role
					},
					success:res=>{
						if(res.data.code === 200){
							res.data.data.rows.forEach(item=>{
								let starsList =  item.stars.split(",")
								if(starsList.length > 20){
								   let  starsString = starsList.slice(0,20).toString()
								   item.stars = starsString
								}
							})
							this.videoList = res.data.data.rows
						}
					}
				})
			}
		}, 
		mounted() {                                                                                                                         
               this.getAllVideos(1)
        }

	}
</script>

<style scoped>
	@import url("refrash.css");

</style>
