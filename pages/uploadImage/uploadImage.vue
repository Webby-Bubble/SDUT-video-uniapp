<template>
	<view class="uploadImageAll">
		<u-overlay :show="show" :duration="400" :z-index ="999" :opacity="1">
			<view  class="iconfont icon-houtui" style="color: white;
			width: 60px;position: absolute;top: 40px;left: 10px;" @click="toMyInfo()" >返回</view>
			<view   style="color: white;
			width: 50px;position: absolute;top: 40px;right: 0px;padding-left: 10px;" @click="confirmUploadTX()" >确定</view>
			<view class="touXiangBJ">
				<image v-if="type === 'background'" :src=" user.userCover" style="width: 100%;;height: 245px;"></image>
				<image v-if="type === 'touxiang'" :src="user.userPic" style="width: 100%;;height: 245px;"></image>
			</view>
			<view class="updateTouxiangButton" @click="uploadTX()">{{type === 'background'?'更换背景':'更换头像'}} </view>
		</u-overlay>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show:true,
				file:[],
				type:'',//我的信息叶传过来的类型参数 'backgroud为更改背景操作' 'touxiang为更改头像操作'
				user:{
					id:'',
					userName:'',
					password:'',
					userPic:'',
					userCover:'',
					sex:'',
					content:'',
					age:''
				},
				touXiangForm:{
					id:'',
					userPic:'',
					userCover:''
				}
			}
		},
		methods:{
			uploadTX(){
				let _this = this;
				
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths[0])
				        uni.uploadFile({
				            url: this.videoPath + '/video/upload', //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
				            success: (uploadFileRes) => {
								
								// 判断当前是更改背景还是头像
								if(_this.type === 'background'){
									_this.touXiangForm.userCover =JSON.parse(uploadFileRes.data).data
									_this.user.userCover = JSON.parse(uploadFileRes.data).data
									
								}else if(_this.type === 'touxiang'){
									_this.touXiangForm.userPic =JSON.parse(uploadFileRes.data).data
									_this.user.userPic =JSON.parse(uploadFileRes.data).data
								}
				            
				            }
				        });
				    }
				});
			},
			toMyInfo(){
				uni.reLaunch({
					url:'/pages/myInfo/myInfo'
				})
			},
			getStorageInfo(){
				let _this = this;
				uni.getStorage({
					key:'user',
					success:function(res){
						_this.user = JSON.parse(res.data)
					}
				})
			},
			confirmUploadTX(){
				this.touXiangForm.id = this.user.id
				uni.request({
					url:this.userPath + '/user/updateUserPicOrUserCover',
					method:'POST',
					data:this.touXiangForm,
					success:res=>{
						if(res.data.code === 200){
							const user = JSON.parse(uni.getStorageSync('user'))
							if(this.type === 'touxiang'){
								user.userPic  = this.touXiangForm.userPic
								uni.setStorageSync('user',JSON.stringify(user))
								uni.$u.toast('头像修改成功')
							}else if(this.type === 'background'){
								user.userCover  = this.touXiangForm.userCover
								uni.setStorageSync('user',JSON.stringify(user))
								uni.$u.toast('背景修改成功')
							}
							this.toMyInfo()
						}else{
							uni.$u.toast('头像修改失败，请重试！')
						}
					}
				})
			}
			
	
		},
		onLoad(option){
			this.getStorageInfo()
			this.type = option.type
			
		}
		
	}
	
</script>

<style scoped>
	@import url("uploadImage.css");
	/deep/.u-upload__button{
		background-color: #404143;
		position: absolute;
		bottom: 10px;
		left: 25%;
	}
</style>
