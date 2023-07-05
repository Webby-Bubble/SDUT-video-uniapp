<template>
	<view class="report">
		<back-home title="违规举报"></back-home>
		<view class="reportContent">
			<view class="reportHz">被举报</view>
			<view class="baseContent">
				{{shortVideo.userName == null?video.director:shortVideo.userName}} 的作品 “{{shortVideo.videoContent == null?video.videoTitle:shortVideo.videoContent}}”将被视频违规审核
			</view>
			
			<view class="reportIntroduceTitle">
				<view class="reportHz" style="margin-top: 30px;">举报原因或描述</view>
				<view class="xing">*</view>
			</view>
			<view >
				描述作品中可能出现违规的信息，如“涉及违规的事件，人物，动作，或者穿着等等内容”
			</view>
			<view class="descreption">
				<u--textarea style="background-color: #efefef;"  height="150" v-model="reportForm.reportContent" placeholder="详细描述举报理由" count ></u--textarea>
			</view>
			
			<view>
				<view class="reportHz" style="margin-top: 30px;">图片材料提交（最多3张）</view>
				<view class="reportImgOut">
					<view v-for="(item,index) in reportForm.reportImgs" :key="index" style="margin-right: 10px;">
						<u--image :showLoading="true" :src="item" width="80px" height="80px"></u--image>
					</view>
					
					<view class="uploadReport" @click="uploadReportImg()">
						<view class="iconfont icon-zhaoxiangji"></view>
					</view>
				</view>
			</view>
			
			<view class="reportButtonOut">
				<button class="reportButton" @click="submitReport()">提交</button>
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
				userId:'',
				shortVideo:{},
				video:{},
				reportForm:{
					shortVideoId:'',
					videoId:'',
					userId:'',
					reportContent:'',
					reportImgs:[
						
					]
				}
			}
		},
		methods:{
			submitReport(){
				if(this.shortVideo.id != null && this.shortVideo.id != ''){
					this.reportForm.shortVideoId = this.shortVideo.id
				}else{
					this.reportForm.videoId = this.video.id
				}
				
				this.reportForm.userId = this.userId
				if(this.reportForm.reportContent.length != 0){
					uni.request({
						url:this.videoPath + '/video/addVideoReport',
						method:'POST',
						data:this.reportForm,
						success:(res)=> {
							if(res.data.code === 200){
								this.reportForm.reportImgs = []
								this.reportForm.reportContent = ''
								uni.showToast({
									title:'举报信息提交成功等待管理人员审核',
									duration:3000,
									icon:'success'
								})
							}
						}
					})
				}else{
					uni.showToast({
						title:'举报理由不能为空',
						duration:3000,
						icon:'none'
					})
				}
			},
			uploadReportImg(){
				if(this.reportForm.reportImgs.length <=3){
					uni.chooseImage({
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
					        uni.uploadFile({
					            url: this.videoPath + '/video/upload', 
					            filePath: tempFilePaths[0],
					            name: 'file',
					            success: (uploadFileRes) => {
									console.log(uploadFileRes,"手机测试")
									this.reportForm.reportImgs.push(JSON.parse(uploadFileRes.data).data)
					            }
					        });
					    }
					});
				}else{
					uni.showToast({
						title:'最多上传三张照片信息~',
						duration:3000
					})
				}
				
			}
		},
		onLoad(option) {
			this.shortVideo = JSON.parse(option.shortVideo || '{}')
			this.video = JSON.parse(option.video || '{}')
			this.userId = option.userId
		}
	}
</script>

<style scoped>
	@import url("report.css");
</style>
