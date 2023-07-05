<template>
	<view style="height: 100%;width: 100%;">
		<view class="weiXinLoginAll" style="width: 100%;
					height: 50px;
					background-color: rgb(116, 211, 115);
					padding-top: 38px;
					"
				> 
			<view class="iconfont icon-houtui" style="font-size: 20px;padding-top: 10px;color: white;width: 70px;" @click="comeback()">返回</view>
			<view style="position: absolute;left: 0;right: 0;margin: auto;text-align: center;color: white;font-size: 20px;margin-top: -26px;width: 130px;">微信授权登录</view>
			
		</view>
			<view style="display: flex;flex-direction: row;position: absolute;top: 13%;">
				<image src="../../static/img/etoakLogo.png" style="width: 25px;height: 25px;margin-left: 10px;" ></image>
				<view style="font-size: 20px;margin-left: 5px;">易途影视 <text style="font-size: 15px;margin-left: 15px;">申请使用</text></view>
			</view>
			<view style="position: absolute;top: 18%;font-size: 20px;font-weight: 500;margin-left: 10px;">获取你的昵称、头像</view>
			
			
			<!-- 头像展示区域 -->
			<u-line style="position: absolute;top: 24%;"></u-line>
			<view style="position: absolute;top: 25%;display: flex;flex-direction: row;left: 10px;width: 100%;">
				<image :src="userInfo.userPic" style="width: 40px;height: 40px;"></image>
				<view style="margin-left: 10px;">
					<view>{{userInfo.userName}}</view>
					<view style="color: #bdc0c3;font-size: 13px;">微信昵称头像</view>
				</view>
				<view v-if="userInfo.userName" style="margin-left: 50%;margin-top: 10px; color: rgb(116, 211, 115);" class="iconfont icon-dui"></view>
			</view>
			<u-line style="position: absolute;top: 31%;"></u-line>
			<view style="position: absolute;top: 40%;width: 100%;">
				<button style="margin-top: 40px;width: 60%;background-color: rgb(116, 211, 115);color: white;" @click="powerLogin()">允许授权登录</button>
				<button style="margin-top: 20px;width: 60%;" @click="toLogin()"><view style="color:rgb(116, 211, 115) ;" >取消授权</view></button>
			</view>
			
			<!-- 提示框 -->
			<view >
				<u-modal :show="showAllowVisiable" :showCancelButton="true" @cancel="showAllowVisiable = false" @confirm="login()" title="温馨提示" content='允许微信授权后才能获取微信信息'></u-modal>
			</view>
		
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				showAllowVisiable:false,
				userInfo:{
					userName:'',
					userPic:'',
					openid:'',
					sex:''
				}
			}
		},
		methods:{
			login(){
				let that = this
				uni.getUserProfile({
					desc: '获取你的昵称、头像',
					success: userRes => {
						if (userRes.errMsg == 'getUserProfile:ok' && userRes.userInfo != undefined) {
							//对页面中的变量进行赋值
							that.userInfo.userName = userRes.userInfo.nickName
							that.userInfo.userPic = userRes.userInfo.avatarUrl
							that.userInfo.openid = userRes.userInfo.openId
							that.userInfo.sex = userRes.userInfo.gender==0?'男':'女'
							this.showAllowVisiable = false
							// 调用接口请求openid
							//that.getUserOpenId(userInfo)
						} else {
							uni.showToast({
								icon:"none",
								title:"获取失败，请重试"
							})
						}
					},
					fail: error => {}
				});
			},

			getUserOpenId(){
				uni.login({
					provider: 'weixin',
					success(loginAuth) {
						var data = {'code':loginAuth.code}
						var path = '/user/getOpenId'
						//console.log(loginAuth)
						// const header = {
						// 	'content-type': 'application/x-www-form-urlencoded'
						// }
						// uni.request({
						// 	header,
						// 	url: this.path + path,
						// 	method: 'POST',
						// 	data,
						// 	success:res=>{
								
						// 	}
						// })
					}
				})
			},
			// 授权登录
			powerLogin(){
				uni.request({
					url:this.path + '/user/getUserByName?openid='+this.userInfo.openid,
					success:res=>{
						console.log(res)
						if(res.data.data != null){
							uni.setStorageSync('user',JSON.stringify(res.data.data))
								
							uni.reLaunch({
								url:'/pages/myInfo/myInfo'
							})
						}else{
							if(this.userInfo.userName != '' && this.userInfo.userName != 'undefind'){
								uni.request({
									url:this.path + '/user/addUser',
									method:'POST',
									data:this.userInfo,
									success:res=>{
										if(res.data.code === 200){
											uni.setStorageSync('user',JSON.stringify(res.data.data))
												
											uni.reLaunch({
												url:'/pages/myInfo/myInfo'
											})
											
										}
									}
								})
							}else{
								uni.showToast({
									title:'授权失败，请检查网络',
									duration:3000,
									position:'center',
									icon:'none'
								})
							}
						
						}
					}
				})
			},
			comeback(){
				uni.navigateBack({
					delta:1
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/myInfo/userLogin'
				})
			}
		},
	
		mounted() {
			this.getUserOpenId()
			//this.login()
			this.showAllowVisiable = true
		}
	}
</script>

<style>
</style>
