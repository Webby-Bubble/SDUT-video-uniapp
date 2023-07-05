<template>
	<view class="myReportInfo">
		<back-home title="我的举报"></back-home>
		
		<!-- 没有作品的图标 自适应居中css position:absolute; left:0; rigth:0; margin:auto -->
		<view  v-if="reportInfoList.length == 0" style="position: absolute;top: 30%;left: 0;right: 0;margin: auto;text-align: center;">
			 <view style="font-size: 110px;color: #b8d1e6;" class="iconfont icon-lab-kuqi"></view>
			 <view style="margin-top: 30px;color: #79828a;">暂无记录</view>
		</view>
		
		<view class="reportOutClass">
			<u-tabs :list="reporttabs" @click="queryReportByStatus"></u-tabs>
			<view class="reportCardOut"> 
				<view class="reportCardContent" v-for="(item,index) in reportInfoList" :key="index">
					<view class="reportHeaderClass">
						<view style="font-size: 15px;">{{item.shortVideoId == null?'影视举报':'短视频举报'}}</view>
						<view class="reportHeaderIcon">
							<view style="color: #8c8c8c;font-size: 13px;margin-top: -2px" @click="toReportSteps(item.id)">查看详情</view>
							<view><u-icon name="arrow-right"></u-icon></view>
						</view>
					</view>
					
					<view class="reportContentLeftAndRight">  
						<view>
							<image :src="item.videoCover" style="width: 60px;height: 60px;border-radius: 8px;"></image>
						</view>
						<view class="reportContentRight" style="font-size: 13px;">
							<view class="reportTitle">{{item.videoTitle}}</view>
							<view class="reportrsAndTime">举报理由：{{item.reportContent}}</view>
							<view class="reportrsAndTime">举报时间：2023-04-17 16:39</view>
						</view>
					</view>
					
					<view class="shenheClass" v-if="item.reportStatus == 2">
						<view class="leftIconAndTitle">
							<view :class="item.examineStatus==1?'iconfont icon-duihao2':'iconfont icon-cuowu1' " :style="item.examineStatus==1?'color:#3bb53b':'color: #ff6767;'"></view>
							<view style="margin-left: 5px;margin-right: 10px;font-size: 13px;">{{item.examineStatus == 1?'举报成功':'举报失败'}}</view>
						</view>
						<view style="color: gray;font-size: 13px;">|  {{item.examineContent.substring(0,14)+"..."}}</view>
					</view>
					
					<view class="shenheClass" v-if="item.reportStatus == 1">
						<view class="leftIconAndTitle">
							<view class="iconfont icon-shenhezhong" style="color: #ff6767;"></view>
							<view style="margin-left: 5px;margin-right: 10px;font-size: 13px;">审核中</view>
						</view>
						<view style="color: gray;font-size: 13px;">|  审核结果请注意邮件查收</view>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import backHome from '@/componets/backMenu/backMenu.vue'
	export default{
		components:{
			backHome
		},
		data(){
			return{
				reportInfoList:[],
				userId:'',
				reporttabs:[
					{name:'已审核',reportStatus:2},
					{name:'待审核',reportStatus:1},
				]
			}
		},
		methods:{
			toReportSteps(reportId){
				uni.navigateTo({
					url:'/pages/myInfo/myReportInfo/reportSteps/reportSteps?reportId='+reportId
				})
			},
			queryReportByStatus(report){
				uni.request({
					url:this.videoPath + '/video/queryAllReportInfoByStatus',
					method:'GET',
					data:{
						userId:this.userId,
						reportStatus:report.reportStatus
					},
					success: (res) => {
						this.reportInfoList = res.data.data
					}
				})
			}
		},
		onLoad(option){
			this.userId = option.userId
			this.queryReportByStatus({reportStatus:2})
		}
	}
</script>

<style scoped>
	@import url("myReportInfo.css");
</style>
