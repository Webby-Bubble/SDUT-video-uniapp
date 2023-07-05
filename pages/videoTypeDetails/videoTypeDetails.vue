<template>
	<view class="videoTypeDetails">
		<back-menu></back-menu>
		<u-tabs :current="tabCurrent" activeStyle="color:rgb(109 175 228);font-size:16px" style="padding-top: 90px;background-color: #f0f0f0;" :list="tabs" @click="clickTabs"></u-tabs>
		<view style="height: 100%;">
			<!-- 实现局部区域滚动 此标签高度属性必填 否则不起作用 -->
			<scroll-view  scroll-y="true" style="height: 90vh;position: relative;">
				<view style="display: flex;flex-direction: row;position: absolute;top: 20px;left: 15px;">
					<view class="iconfont icon-zuixin" @click="queryVideosByDesc('最新')">最新</view>
					<view style="margin-left: 10px;" @click="queryVideosByDesc('评分')" class="iconfont icon-pingfen">评分</view>
				</view>
				<view style="height: 610px;background-color: rgb(241 244 246);margin-top: 50px;
				     margin-left: 10px;margin-right: 10px;position: relative;">
					<u-row style="flex-wrap: wrap;margin-left: 5px;" gutter="10" >
						<u-col :span="3.9"  v-for="(video,index) in videoList" :key="index" @click="showVideoDetails(video)" style="margin-top: 10px;position: relative;">
							<image :src="video.videoCover"
							 style="width: 100%;height: 140px;"></image>
							<view class="picBottom"><text>{{video.videoTitle}}</text></view>
						</u-col>
					</u-row>
					<view style="margin-top: 20px;margin-bottom: 10px;">
						<u-row>
							<u-col :span="2.5">
								<u-button shape="square"  size="mini" style="width: 40px;height: 25px;" @click="getfirstList()">首页</u-button>
							</u-col>
							<u-col :span="3">
								<u-button shape="square"  size="mini" style="width: 65px;height: 25px;"@click="getPreList()">上一页</u-button>
							</u-col>
							<u-col :span="1">
								<view>{{pageNum}}/{{last}}</view>
							</u-col>
							<u-col :span="3">
								<u-button shape="square"  size="mini" style="width: 65px;height: 25px;"@click="getNextList()">下一页</u-button>
							</u-col>
							<u-col :span="2">
								<u-button shape="square"  size="mini" style="width: 65px;height: 25px;"@click="getLastList()">末页</u-button>
							</u-col>
						</u-row>
					</view>
					<u-gap height="3" bgColor="white" style="margin-top: 20px;"></u-gap>
					<view style="text-align: center;font-size: 14px;position: absolute;bottom: 10px;left: 0;right: 0;margin: auto;">
						
						<text style="color: #8a9096;">
							返回顶部-相关人员统计
							免费声明：本站所有内容都是都是从互联网上搜索
							而集来，若侵犯了您的利益，请及时联系我们！
							E-Mail: Etoak12345@163.com
						</text>
					</view>
					
				</view>
			</scroll-view>
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
				tabs: [{
						name: '电影',
					}, {
						name: '电视剧',
					}, {
						name: '综艺'
					}, {
						name: '动漫'
				}],
				videoKind:'',
				tabCurrent:'',
				videoList:[],
				pageNum:1,
				pre:'',
				next:'',
				last:'',
				total:0,
				zuixin:'',
				pingFen:'',
				isRunnig:false
			}
		},
		methods:{
			queryVideosByDesc(val){
				this.isRunnig = !this.isRunnig
				if(val === '最新'){
					if(this.isRunnig){
						this.zuixin = 'DESC'
						this.pingFen = ''
						this.getAllVideos(1,9)
					}else{
						this.zuixin = ''
						this.getAllVideos(1,9)
					}
				}else{
					if(this.isRunnig){
						this.pingFen = 'DESC'
						this.zuixin = ''
						this.getAllVideos(1,9)
					}else{
						this.pingFen = ''
						this.getAllVideos(1,9)
					}
				}
				
			},
			getfirstList(){
				this.getAllVideos(1,9)
			},
			getPreList(){
				this.getAllVideos(this.pre,9)
			},
			getNextList(){
				this.getAllVideos(this.next,9)
			},
			getLastList(){
				this.getAllVideos(this.last,9)
			},
			clickTabs(e){
				this.videoKind = e.index+1
				this.getAllVideos(1,9)
			},
			
			showVideoDetails(video){
				
				uni.navigateTo({
					// 页面跳转 传递对象参数需要使用 encodeURIComponent(JSON.stringify(video)) 转化
					url:'/pages/videoInfo/vidoeInfo?video='+encodeURIComponent(JSON.stringify(video))
				})
			},
			getAllVideos(pageNum,pageSize){ 
				uni.request({
					url:this.videoPath + '/video/getAllVideos',
					data:{
						videoKind:this.videoKind,
						pageNum:pageNum,
						pageSize:pageSize,
						zuixin:this.zuixin,
						pingFen:this.pingFen,
						role:JSON.parse(uni.getStorageSync('user')).role
					},
					success:res=>{
						if(res.data.code === 200){
							this.videoList = res.data.data.rows
							this.pageNum = res.data.data.pageNum
							this.pre = res.data.data.pre
							this.next = res.data.data.next
							this.total = res.data.data.total
							this.last = res.data.data.pageCount
						}
					}
				})
			}
		},
		onLoad(option) {
			this.videoKind = option.videoKind
			this.tabCurrent = option.videoKind-1
			this.getAllVideos(1,9)
		}
	}
</script>

<style scoped>
	@import url("videoTypeDetails.css");
</style>
