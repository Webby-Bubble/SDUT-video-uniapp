<template>
	<view class="queryVideos">
		<view class="queryHeaderClass">
			<view class="queryIndex">
				<view class="iconfont icon-houtui" @click="comeBack()"></view>
				<view class="queryInputClass">
					<u--input
							v-model="videoName"
							style="border-radius: 30px;background-color: #eaecf2"
							:placeholder="videoName"
							suffixIcon="search"
							placeholderStyle="text-align:center"
							suffixIconStyle="color: #909399;font-size:19px"
						></u--input>
				</view>
				<view @click="queryByName()">搜索</view>
			</view>
			<view >
				<view class="iconfont icon-liebiao" style="margin-top: 10px;font-size: 23px;margin-left: 10px;color: #51b7ca;">
					<text style="font-size: 18px;color: #000000;">与"{{videoName}}"有关的影视</text>
				</view>
				<hr style="margin-top: 15px;"></hr>
			</view>
		</view>
		<!-- 查询列表部分 -->
		<view class="liebiaoContent">
			<view v-for="(video,index) in videoList" :key="index" >
				<u-row style="margin-bottom: 10px;margin-top: 10px;">
					<u-col :span="4" style="position: relative;">
						<image :src="video.videoCover" style="height: 130px;width: 80%;"></image>
						<view class="imageBottomHZ">
							<text style="color: white;font-size: 10px;margin-right: 5px;">{{video.videoChildrenList.length == 0?'电影':'共 ' +video.videoChildrenList.length + ' 集' }}</text>
						</view>
					</u-col>
					<u-col :span="8" style="margin-left: -15px;">
						<view style="font-size: 16px;font-weight: 500px;">{{video.videoTitle}}</view>
						<view style="color: #a2a3a4;margin-top: 10px;font-size: 12px;">导演：<text style="color: #333737;">{{video.stars}}</text></view>
						<view style="color: #a2a3a4;margin-top: 10px;font-size: 12px;">主演：<text style="color: #333737;">{{video.director}}</text></view>
						<u-row style="margin-top: 10px;">
							<u-col :span="4.5">
								<button style="height: 26px;width: 80px;border-radius: 5px;background-color: #2bb5d0;ss" @click="toVideoPlay(video)">
									<view style="font-size: 13px;margin-top: -4px;color: white;">立即播放</view>
								</button>
							</u-col>
							<u-col :span="4">
								<button style="height: 26px;width: 80px;border-radius: 5px;"  @click="toVideoInfo(video)">
									<view style="font-size: 13px;margin-top: -4px;">查看详情</view>
								</button>
							</u-col>
						</u-row>
					</u-col>
				</u-row>
				<u-line ></u-line>
			</view>
			<!-- 空状态 -->
			<view v-show="videoList.length === 0">
				<view class="iconfont icon-lab-kuqi"></view>
				<view style="text-align: center;margin-left: -35px;color: #9fa3a7;">没有查到想要的影视</view>
			</view>
			<view style="height: 150px;">
				<u-row style="margin-top: 10px;">
					<u-col :span="2">
						<button class="fenyeButton"><view class="buttonText">首页</view></button>
					</u-col>
					<u-col :span="2.5">
						<button class="fenyeButton"><view class="buttonText">上一页</view></button>
					</u-col >
					<u-col :span="2.5">
						<button class="fenyeButton" style="background-color:#51b7ca;">
							<view  style="color: white;" class="buttonText">{{pageNum}}/{{pageCount}}</view>
						</button>
					</u-col>
					<u-col :span="2.5">
						<button class="fenyeButton"><view class="buttonText">下一页</view></button>
					</u-col >
					<u-col :span="2">
						<button class="fenyeButton"><view class="buttonText">尾页</view></button>
					</u-col>
				</u-row>
				<u-divider text="^_^如有问题反馈到邮箱etoak@163.com ^_^"></u-divider>
			</view>
		</view>
		<view class="bottomBackHomeView" >
			<button class="iconfont icon-shouye" style="color: #51b7ca;" @click="toHome()">首页</button>
		</view>
	</view>
</template>

<script>
	import homeHeader from '../../componets/homeHeader/homeHeader.vue'
	export default{
		components:{
			homeHeader
		},
		data(){
			return{
				videoName:'',
				videoList:[],
				pageNum:1,
				pageSize:3,
				total:0,
				pageCount:0
			}
		},
		methods:{
			queryByName(){
					uni.request({
						url:this.path + '/video/queryHistoryByHistoryName',
						method:"GET",
						data:{historyName:this.videoName},
						success: (res) => {
							if(res.data.code === 200){
								// 将搜索记录添加到数据库
								uni.request({
									url:this.path + '/video/addHistory',
									method:"POST",
									data:{historyName:this.videoName},
									success: (res) => {
										if(res.data.code === 200){
											console.log("搜索记录添加成功ss")
										}
									}
								})
							}else{
								console.log("记录已存在 不再添加至数据库")
							}
						}
					})
					
				this.queryVideosByName(this.videoName)
			},
			comeBack(){
				uni.navigateBack({
					delta:1
				})
			},
			toHome(){
				uni.reLaunch({
					url:'../login/login'
				})
			},
			toVideoPlay(video){
				uni.navigateTo({
					url:'/pages/videoInfo/videoPlay/videoPlay?video=' + encodeURIComponent(JSON.stringify(video))
				})
			},
			
			toVideoInfo(video){
				uni.navigateTo({
					url:'/pages/videoInfo/vidoeInfo?video='+encodeURIComponent(JSON.stringify(video))
				})
			},
			queryVideosByName(videoName){
				uni.request({
					url:this.videoPath + '/video/getAllVideos',
					data:{
						videoTitle:videoName
					},
					success:res=>{
						if(res.data.code === 200){
							this.videoList = res.data.data.rows
							this.pageNum = res.data.data.pageNum
							this.pageCount = res.data.data.pageCount
						}
					}
				})
			}
			
		},
		onLoad(option) {
			this.videoName = option.videoName
			this.queryVideosByName(option.videoName)
		}
	}
</script>

<style>
	@import url("queryVideos.css");
</style>
