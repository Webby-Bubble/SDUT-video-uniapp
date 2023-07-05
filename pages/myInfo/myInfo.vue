<template>
	<view class="myInfoAll">
		<!-- 背景图 -->
		<view class="infoHeader">
			<view class="backgroundButton" v-show="showBackGroundButton" @click="openUploadImage('background')">更改背景</view>
			<image  :src="user.userCover" style="height: 400rpx;width: 100%;"
			 @click="showBackGroundButton = false"
			 @longpress="showBackGroundButton = true"></image>
		</view>
		<view class="avatarInfo">
			<!-- 头像框 -->
		  <view class="avatar-item" @click="openUploadImage('touxiang')">
			   <image v-if="user.userPic != ''"   :src="user.userPic" class="touXiang"></image>
			  <view v-if="user.userPic == ''"  class="xiangji"><text class="iconfont icon-zhaoxiangji" style="font-size: 30px;"></text></view>
		   </view>
		   
			<view>
				<view v-show="user.id == ''">
					<u-row style="padding-left: 120px;">
						<u-col span="3">
							<text style="font-size: 20px;font-weight: bolder;" @click="toUserLogin()">登录</text>
						</u-col>
						<u-col span="4">
							<text style="font-size: 20px;font-weight: bolder;" @click="toRegist()">注册</text>
						</u-col>
					</u-row>
				</view>
				<view v-show="user.id != ''" style="margin-top: 8px;">
					<u-row style="padding-left: 80px;">
						<u-col :span="4">
							<view class="infos">
								<text class="wzStye">视频获赞</text>
								<text>{{userCountForm.shortVideoLikeCount}}</text>
							</view>
						</u-col>
						<u-col :span="4" style="padding-left: 14px;">
							<view class="infos" @click="toGuanZhuAndFenSi(user.id,user.userName)">
								<text class="wzStye">关注</text>
								<text>{{userCountForm.guanZhuCount}}</text>
							</view>
						</u-col>
						<u-col :span="4">
							<view class="infos" @click="toGuanZhuAndFenSi(user.id,user.userName)">
								<text class="wzStye">粉丝</text>
								<text>{{userCountForm.fenSiCount}}</text>
							</view>
						</u-col>
					</u-row>
				</view>
				
			</view>
			<view style="display: flex;align-items: center;margin-top: -10px;">
				<view class="userName" >{{user.userName}}</view>
			
				<view class="biaoqian" v-if="user.id != ''">
					<text :class="user.sex === '男'?'iconfont icon-nan':'iconfont icon-nv'" 
					:style="user.sex === '男'?'color: blue;':'color: red;'"></text>{{user.age}}岁
				</view>
				
			</view>
			
			<u-line></u-line>
			<!-- 个性签名 -->
			<view class="qianMing">
				<text>{{user.content}}</text>
			</view>
			<u-gap height="1" bgColor="#bbb" marginBottom="20px" marginTop="20px"></u-gap>
			
			<view class="myContent">
				<view style="display: flex;flex-direction: row;justify-content: space-between;" @click="toMyShouCang(user.id)">
					<view class="iconLeft">
						<u-icon name="star"></u-icon>
						<view style="padding-top: 15px;padding-left: 10px;padding-bottom: 10px;">我的收藏</view>
					</view> 
					
					<u-icon color="#a7a7a7" class="rightIcon" name="arrow-right" size="22px"></u-icon>
				</view>
				<u-line></u-line>
				<view style="display: flex;flex-direction: row;justify-content: space-between;" @click="toMyVideo(user.id)">
					<view class="iconLeft">
						<u-icon  name="list-dot"></u-icon>
						<view style="padding-top: 15px;padding-left: 10px;padding-bottom: 15px;" >我的作品</view>
					</view> 
 					
					<u-icon color="#a7a7a7" class="rightIcon" name="arrow-right" size="22px"></u-icon>
				</view>
				<u-line></u-line>
				<view style="display: flex;flex-direction: row;justify-content: space-between;" @click="toReportInfo(user.id)">
					<view class="iconLeft">
						<u-icon name="file-text"></u-icon>
						<view style="padding-top: 15px;padding-left: 10px;padding-bottom: 15px;" >举报记录</view>
					</view> 
					<u-icon color="#a7a7a7" class="rightIcon" name="arrow-right" size="22px"></u-icon>
				</view>
				<u-line></u-line>
				<view style="display: flex;flex-direction: row;justify-content: space-between;" @click="toMyMessage(user)">
					<view class="iconLeft">
						<u-icon name="account"></u-icon>
						<view style="padding-top: 15px;padding-left: 10px;padding-bottom: 15px;" >个人资料</view>
					</view> 
					<u-icon color="#a7a7a7" class="rightIcon" name="arrow-right" size="22px"></u-icon>
				</view>
				<u-line></u-line>
				<view style="display: flex;flex-direction: row;justify-content: space-between;" @click="showLogOut = true">
					<view class="iconLeft">
						<u-icon name="setting"></u-icon>
						<view style="padding-top: 15px;padding-left: 10px;padding-bottom: 15px;">设置</view>
					</view> 
					<u-icon color="#a7a7a7" class="rightIcon" name="arrow-right" size="22px"></u-icon>
				</view>
				
			  <!-- 退出界面 -->
			  <u-popup :show="showLogOut" mode="bottom" :closeOnClickOverlay="false"  @close="showLogOut = false"  closeable>
				  <view style="height: 200px;display: flex;flex-direction: column;justify-content: space-around;">
					 <button v-if="user.id != ''" @click="showConfirmOut = true,showLogOut =false" style="width: 100%;">退出登录</button>
					 <button v-if="user.id == ''" style="width: 100%;" @click="toUserLogin()">未登录，点击登录</button>
				  </view>
			  	</u-popup>
			</view>
			<!-- 退出弹框 -->
			<view >
				<u-modal style="text-align: center;" @cancel="showConfirmOut = false" @confirm="logout()" :show="showConfirmOut" title="退出登录" confirmColor="red" :showCancelButton="true" content='是否退出登录!'></u-modal>
			</view>
		
		</view>
		<!-- <view class="infoBottom">
			<button style="width: 95%;border-radius: 15px;background-color: #91dea3;" @click="showLogin = true">登录</button>
			<view style="margin-left: 15px;margin-top: 20px;color: red;">还没账号？点击注册</view>
		</view> -->
	
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				token:'',
				showLogOut:false,//退出弹框
				showSex:false,//展示性别属性
				showBirth:false,//展示出生年月日属性
				showConfirmOut:false,//展示确认退出弹框属性
				showUpdateTouXiang:false,//展示修改头像弹框属性
				showUpdateTXBottom:false,//展示底部修改头像属性
				showBackGroundButton:false,//更改背景显示属性
				user:{
					id:'',
					userName:'',
					password:'',
					userPic:'',
					userCover:'',
					sex:'',
					content:'',
					age:'',
					guanZhuCount:0,//关注的数量
					fenSiCount:0,//粉丝数量
					shortVideoLikeCount:0//短视频的获赞量
				},
				userCountForm:{
					guanZhuCount:0,//关注的数量
					fenSiCount:0,//粉丝数量
					shortVideoLikeCount:0//短视频的获赞量
				}
			
			}
		},
		methods:{
			toMyMessage(user){
				uni.navigateTo({
					url:'/pages/myInfo/myInfoDetails/myInfoDetils?user='+encodeURIComponent(JSON.stringify(user))
				})
			},
			//举报信息
			toReportInfo(userId){
				uni.navigateTo({
					url:'/pages/myInfo/myReportInfo/myReportInfo?userId='+userId
				})
			},
			
			toRegist(){
				uni.navigateTo({
					url:'/pages/myInfo/regist'
				})
			},
			toUserLogin(){
				uni.navigateTo({
					url:'/pages/myInfo/userLogin'
				})
			},
			toMyShouCang(userId){
				if(userId != null &&  userId != undefined && userId != ''){
					uni.navigateTo({
						url:'/pages/myShouCang/myShouCang?userId=' + userId
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'您还未登录哦~',
						duration:2000
					})
				}
			},
			toMyVideo(userId){
				if(userId != null &&  userId != undefined && userId != ''){
					uni.navigateTo({
						url:'/pages/myVideo/myVideo?userId=' + userId
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'您还未登录哦~',
						duration:2000
					})
				}
			},
		 
			close(){
				
				this.showLogin = false
			},
			
			confirmBirth(val){
				this.showBirth = false
				this.regForm.birth = val.value
			},
			getStorageInfo(){
				//let _this = this;
				this.user =  JSON.parse(uni.getStorageSync('user'))
				this.token = uni.getStorageSync('token')
			},
			logout(){
				
				uni.clearStorage();
				uni.reLaunch({
					url:'/pages/myInfo/myInfo'
				})
			},
			openUploadImage(value){
				if(uni.getStorageSync('user') != ''){
					uni.navigateTo({
						url:'/pages/uploadImage/uploadImage?type='+value
					})
				}else{
					uni.showToast({
						title:'登录后更改头像',
						position:'center',
						icon:'error',
						duration:3000
						
					})
				}
				
			},
			queryAllCountOfRedis(userId){
				uni.request({
					url:this.userPath + '/user/querySomeCountOfRedis',
					header:{
						token:this.token
					},
					data:{userId:userId},
					success:res=>{
						if(res.data.code === 200){
							this.userCountForm.guanZhuCount = res.data.data.guanZhuCount
							this.userCountForm.fenSiCount = res.data.data.fenSiCount
							this.userCountForm.shortVideoLikeCount = res.data.data.shortVideoLikeCount	
						}else{
							this.showErrorMsg(res.data.data)
						}
						
					}
				})
			},
			showErrorMsg(msg){
				uni.showToast({
					title:msg,
					icon:'none',
					duration:3000
				})
			},
			toGuanZhuAndFenSi(userId,userName){
				uni.navigateTo({
					url:'/pages/myInfo/guanZhuAndFenSi?userId='+userId+'&userName='+userName
				})
			}
			
		},
		onLoad(){
			this.getStorageInfo()
			if(this.user.id != ''){
				this.queryAllCountOfRedis(this.user.id)
			}
		},
		onTabItemTap() {
			if(this.user.id != ''){
				this.queryAllCountOfRedis(this.user.id)
			}
		}
		
		
	}
</script>

<style>
	@import url("myInfo.css");
</style>
