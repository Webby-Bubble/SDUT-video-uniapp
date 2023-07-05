<template>
	<view class="reportSteps">
		<view class="bgColor"></view>
		<view class="containerOut">
			
			<view class="reportHeaderOut">
				<view class="backOut" @click="goBack()">
					<view class="iconfont icon-houtui"></view>
					<view class="">返回</view>
				</view>
				<view style="margin-left: -45px;font-weight: 600;font-size: 14;">举报进度</view>
				<view></view> 
			</view>
			
			<view class="reportStatusCard" v-if="reportResult.reportStatus === 1">
				<view class="iconfont icon-shizhong duiClass1" style="color: orangered;"></view> 
				<view style="margin-left: 10px;margin-top: -2px;font-size: 20px;">审核中~ </view> 
			</view>
		
			<view class="reportStatusCard" v-if="reportResult.reportStatus !== 1">
				<view :class="reportResult.examineStatus === 1?'iconfont icon-duihao2 duiClass1':'iconfont icon-cuowu1 duiClass1'"
				 :style="reportResult.examineStatus === 1?'color:green':'color:#ff5236'">
				</view> 
				<view style="margin-left: 10px;margin-top: -2px;font-size: 20px;">{{reportResult.examineStatus === 1?'举报通过':'举报失败'}}</view> 
			</view>
			<view class="reportStatusCard1">
				<view class="steps">
					<u-steps direction="column" activeColor="rgb(21 147 171)" :current="reportResult.reportStatus == 1?0:1" >
							
							<u-steps-item title="发起举报" :desc="reportResult.createTime"></u-steps-item>
							<view class="reportStart">
								<view class="reportItems">
									<view>视频举报：</view> 
									<view>{{reportResult.videoTitle}}</view> 
								</view>
								<view class="reportItems">
									<view style="margin-top: 5px;">举报理由：</view>
									<view>{{reportResult.reportContent}}</view> 
								</view>
							</view>
							
							<view  v-if="reportResult.reportStatus == 2" style="margin-top: 20px;">
								<u-steps-item title="审核完成" :desc="reportResult.endTime"></u-steps-item>
								<view class="reportStart">
									<view class="reportItems">
										<view>{{reportResult.examineContent}}</view> 
									</view>
								</view>
							</view> 
							
					</u-steps>
					
					
				</view>
			</view>
		</view>
		
		<view class="toMyReportClass" @click="goBack()">
			<view>查看我的举报</view> 
			<view ><u-icon name="arrow-right"></u-icon></view> 
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reportResult:{}
			}
		},
		methods:{
			
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			queryReportResultByid(reportId){
				uni.request({
					url:this.videoPath + '/video/queryReportResultByid?reportId=' + reportId,
					method:'GET',
					success: (res) => {
						if(res.data.code === 200){
							this.reportResult = res.data.data
						}else{
							console.log('异常啦');
						}
					}
				})
			}
		},
		onLoad(option) {
			this.queryReportResultByid(option.reportId)
		}
	}
</script>

<style scoped>
	
	@import url("reportSteps.css");
</style>