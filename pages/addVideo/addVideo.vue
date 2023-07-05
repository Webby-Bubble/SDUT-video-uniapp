<template>
	<view class="addVideoAll">
		<back-menu title="发布视频"></back-menu>
		<view >
			<view style="padding-top: 88px;">
				<u-line></u-line>
				<view v-if="filePath == ''" 
					style="height: 225px;width: 100%;">
					<view id="uploadIcon" class="iconfont icon-shangchuanshipin"></view>
					<view class="uploadWZ">上传后的视频在此预览</view>
				</view>
				<u-line></u-line>
				
				<!-- 视频展示 -->
				<video v-if="filePath != ''" :src="filePath" style="width: 100%;border: solid;border-bottom-color: #636262;;"></video>
			</view>
			<!-- -->
			<view class="deleteAndEdit"  v-show="filePath != ''">
				<!-- <button class="iconfont icon-shanchu1"
					style="color: #f55353;border-radius: 20px;border: 1px solid" @click="deleteVideo()"><view>删除此段</view></button>
				<button class="iconfont icon-ai50" style="color: #3ab1ee;border-radius: 20px;border: 1px solid" @click="editVideo()">编辑此段</button> -->
				<view class="ButtonOut" @click="editVideo()">
					<view class="iconfont icon-ai50"></view>
					<view class="hz">编辑此段</view>
				</view>
				
				<view class="ButtonOut" style="background-color: rgb(253 120 116);"  @click="deleteVideo()">
					<view class="iconfont icon-shanchu1" style="font-size: 13px;"></view>
					<view class="hz">删除此段</view>
				</view>
				
			</view>
			
			<view class="videoCoverOut">
				<view class="">视频封面：<span style="color: red;">*</span></view>
				<span style="font-size: 12px;color: gray;">注：长按图片删除封面</span>
				<view class="coverOut">
					<view class="coverImage" v-if="uploadVideoForm.videoCover != ''" @longpress="showDeleteCover = true">
						<image :src="uploadVideoForm.videoCover" style="height: 60px;width: 80px;border-radius: 3px;"></image>
					</view>
					<view class="xiangjiOut" @click="chooseVideoCover()">
						<view class="iconfont icon-zhaoxiangji xiangji"></view>
					</view>
				</view>
				
			</view>
			
			<!-- 删除封面 -->
			<view >
				<u-modal :show="showDeleteCover"
				 title="提示"
				 content='确认删除此封面吗?'
				 showCancelButton
				 showConfirmButton
				 @confirm="uploadVideoForm.videoCover = '',showDeleteCover = false"
				 @cancel="showDeleteCover = false"
				 ></u-modal>
			</view>
			
			<view style="padding-top: 10px;">
				<view style="position: absolute;margin-top: 45px;margin-left: 20px;">视频描述：<span style="color: red;">*</span></view>
				<u--textarea class="textArea"  v-model="uploadVideoForm.videoContent" placeholder="发挥您的才华,让视屏更加精彩..." ></u--textarea>
			</view>
			
			
			<view style="position: absolute;width: 100%;bottom: 45px;">
				<button v-if="filePath == ''" style="width: 90%;border-radius: 30px;;background-color: rgb(71 176 197);color: white;" @click="paishe()">拍摄或选择视频</button>
				<button v-if="filePath != ''" style="width: 90%;border-radius: 30px;background-color: #4d7fb4;color: white;" @click="pubulishVideo()">发布视频</button>
			</view>
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
				showDeleteCover:false,
				showError:false,
				uploadVideoForm:{
					userId:'',
					videoPath:'',
					videoContent:'',
					videoCover:''
				},
				filePath:''
			}
		},
		methods:{
			//选择视频封面
			chooseVideoCover(){
				if(this.uploadVideoForm.videoCover == ''){
					uni.chooseImage({
						success: (chooseImageRes) => {
							 const tempFilePaths = chooseImageRes.tempFilePaths;
							//console.log(tempFilePaths)
							 uni.uploadFile({
								 url: this.videoPath + '/video/upload', //仅为示例，非真实的接口地址
								 filePath: tempFilePaths[0],
								 name: 'file',
								 success: (res) => {
								 	this.uploadVideoForm.videoCover = JSON.parse(res.data).data
								 }
							 })
						}
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'封面只能选择一张',
						duration: 3000
					})
				}
				
			},
			deleteVideo(){
				this.filePath = ''
			},
			editVideo(){
				uni.showToast({
					icon:'none',
					position:'top',
					title:'此功能正在努力开发中~',
					duration: 2000
				})
			},
			paishe(){
				if(uni.getStorageSync('user') !== ''){
					uni.chooseVideo({
						success:(chooseVideo)=>{
							//先展示选择视频
							this.filePath =  chooseVideo.tempFilePath
							//将生成的uuid保存 用于发布存储后台
							//http://192.168.20.108:9999/rst-video/videos/
							this.uploadVideoForm.videoPath = this.getUUID() + '.mp4'
							console.log(this.uploadVideoForm.videoPath)
						}
					})
				
				}else{
					uni.showToast({
						icon:'error',
						position:'top',
						title:'请登录后发布视频~',
						duration: 2000
					})
				}
				
			},
			// uuid
			getUUID(){
				return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				        var r = Math.random() * 16 | 0,
				            v = c == 'x' ? r : (r & 0x3 | 0x8);
				        return v.toString(16);
				    });
			},
			pubulishVideo(){
				
				if(this.uploadVideoForm.videoContent !=='' &&  this.uploadVideoForm.videoCover != ''){
					uni.uploadFile({
						url: this.videoPath + '/video/upload2?fileName='+ this.uploadVideoForm.videoPath, //仅为示例，非真实的接口地址
						filePath: this.filePath,
						name: 'file',
						success:(res)=>{
							// 文件上传的success不会自动将返回的数据转换成对象需要自己转换
							let data = JSON.parse(res.data)
							if(data.code === 200){
								//视频上传本地成功之后将数据添加到数据库
								this.uploadVideoForm.userId = JSON.parse(uni.getStorageSync('user')).id
								this.uploadVideoForm.videoPath =  this.videoPath + '/videos/'+ this.uploadVideoForm.videoPath
								uni.request({
									url:this.videoPath + '/video/addVideo',
									method:'POST',
									data:this.uploadVideoForm,
									success:res=>{
										if(res.data.code === 200){
											uni.$u.toast('视频发布成功！')
											this.uploadVideoForm.videoCover = ''
											this.filePath = ''
											this.uploadVideoForm.videoContent = ''
										}
									}
								})
							}
						}
					})
				}else{
					uni.$u.toast('请确保所有信息已上传再发布吧~')
					return;
				}
			}
		}
	}
</script>

<style scoped>
	@import url("addVideo.css");
</style>
