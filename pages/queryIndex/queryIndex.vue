<template>
	<view class="queryIndexOut">
		<view class="queryIndex">
			<view class="iconfont icon-houtui" @click="comeBack()"></view>
			<view class="queryInputClass">
				<u--input
						v-model="queryName"
						style="border-radius: 30px;background-color: #eaecf2"
					    :placeholder="queryName"
					    suffixIcon="search"
						placeholderStyle="text-align:center"
					    suffixIconStyle="color: #909399;font-size:19px"
					></u--input>
			</view>
			<view @click="toQueryResultBySosuo()">搜索</view>
		</view>
		<view class="queryHistory">
			<view class="queryHz">搜索历史</view>
			<view v-if="showCuowuIcon === false" class="iconfont icon-shanchu2" @click="showCuowuIcon = true"></view>
			<view  v-if="showCuowuIcon" class="cleanHz">
				<view @click="cleanAll()">清空记录</view>
				<view class="xiantiao">|</view>
				<view class="complate" @click="showCuowuIcon = false">完成</view>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="historyClass">
			<u-row class="rowClass">
				<u-col class="colClass"  :span="6" v-for="(item,index) in queryHistoryList" :key="index">
					<view class="historyHz">
						<view @click="toQueryResult(item)">{{item}}</view>
						<view v-show="showCuowuIcon" class="iconfont icon-cuowu" @click="deleteHistory(item)"></view>
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- 展开 -->
		<view class="openClass" @click="showMoreHistory()">
			<view style="color: #4ec5ae">{{openAndCloseVisiable?'折叠':'展开'}}</view>
			<view style="color: #20b291;" :class="openAndCloseVisiable?'iconfont icon-shangjiantou':'iconfont icon-xiajiantou1'"></view>
		</view>
		
		<!-- 搜索推荐 -->
		<view class="queryTuijian">
			<view class="queryHz">搜索推荐</view>
			<view class="changeNext">
				<view class="iconfont icon-shuaxin"></view>
				<view class="changeOther">换一批</view>
			</view>
		</view>
		<view class="historyClass">
			<u-row class="rowClass">
				<u-col class="colClass"  :span="6" v-for="(item,index) in queryTuijian" :key="index">
					<view class="hotAndNew">
						<view @click="toQueryResult(item)">{{item.title}}</view>
						<view :style="item.status === 1?'background-color: #ef3483;':item.status === 2?'background-color: rgb(78, 197, 174);':''"
						 class="hotAndNewClass">{{item.status === 1?"热":item.status === 2?"新":""}}</view>
					</view>
				</u-col>
			</u-row>
		</view>
		
		<!-- 清空提示 -->
		<view >
			<u-modal showCancelButton title="提示"
			 content="亲~ 您确定要清空历史记录吗？" 
			 :show="showCleanVisiable" @cancel="showCleanVisiable = false" @confirm="confirmDelete()"></u-modal>
		</view>
	</view>
	
</template>

<script>
	export default {

		data() {
			return {
				openAndCloseVisiable:false,
				showCleanVisiable:false,
				showCuowuIcon:false,
				queryName:'万里归途',
				queryHistoryList:[],
				queryTuijian:[
					{title:"唐朝诡事录",status:0},
					{title:"苍兰诀",status:1},
					{title:"我的反派男友",status:0},
					{title:"我们这十年",status:0},
					{title:"诚毅",status:0},
					{title:"虞书欣",status:2},
				]
				
			}
		},
		methods: {
			showMoreHistory(){
				this.openAndCloseVisiable = !this.openAndCloseVisiable
				if(this.openAndCloseVisiable){
					this.queryAllHistoryName(1,12)
				}else{
					this.queryAllHistoryName(1,8)
				}
				
			},
			deleteHistory(item){
				uni.request({
					url:this.videoPath + '/video/deleteHistory?historyName=' + item ,
					method:"DELETE",
					success: (res) => {
						if(res.data.code === 200){
							uni.showToast({
								icon:"none",
								title:"删除啦~"
							})
							this.queryAllHistoryName(1,8)
						}
					}
				})
				
			},
			cleanAll(){
				this.showCleanVisiable = true
			},
			comeBack(){
				uni.navigateBack({
					delta:1
				})
			},
			confirmDelete(){
				this.deleteHistory("")
				this.showCleanVisiable = false
			},
			toQueryResultBySosuo(){
				if(this.queryName !=''){
					uni.request({
						url:this.videoPath + '/video/queryHistoryByHistoryName',
						method:"GET",
						data:{historyName:this.queryName},
						success: (res) => {
							if(res.data.code === 200){
								// 将搜索记录添加到数据库
								uni.request({
									url:this.videoPath + '/video/addHistory',
									method:"POST",
									data:{historyName:this.queryName},
									success: (res) => {
										if(res.data.code === 200){
											console.log("搜索记录添加成功ss")
											this.queryAllHistoryName(1,8)
										}
									}
								})
							}else{
								console.log("记录已存在 不再添加至数据库")
							}
						}
					})
					
					uni.navigateTo({
						url:"/pages/queryVideos/queryVideos?videoName="+this.queryName
					})
				}else{
					uni.showToast({
						title:"请输入影视名称",
						icon:"none"
					})
				}
				
			},
			toQueryResult(videoName){
				this.queryName = videoName
				uni.navigateTo({
					url:"/pages/queryVideos/queryVideos?videoName="+videoName
				})
			},
			queryAllHistoryName(pageNum,pageSize){
				uni.request({
					url:this.videoPath + '/video/queryAllHistoryName',
					method:"GET",
					data:{pageNum:pageNum,pageSize:pageSize},
					success: (res) => {
						this.queryHistoryList = res.data.data.rows
					}
				})
			}
		},
		onLoad() {
			this.queryAllHistoryName(1,8)
		}

	}
</script>

<style scoped>
	@import url("queryIndex.css");
	
</style>
