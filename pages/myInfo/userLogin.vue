<template>
	<view class="userLogin">
		<!-- sss -->
		<view >
			<view class="loginBackHeader" >
				<view class="loginBackIcon" @click="goBack()">
					<view class="iconfont icon-houtui"></view>
					<view>返回</view>
				</view>
				<view style="margin-left: -20px;">用户登录</view>
				<view class="iconfont icon-shouye" @click="goHome()"></view>
			</view>
			<view style="height: 160px;width: 100%;background-image: linear-gradient(rgb(38 171 197), rgb(78 187 209));">
				<image src="../../static/img/etoakLoginNew.png" class="logo"></image>
			</view>
			<view style="margin-top: 75px;">
				<u--form
					labelPosition="left"
					:model="loginForm"
					:rules="loginRules"
					ref="loginForm">
					<u-form-item prop="userName" >
						<u--input
								style="height: 35px;margin-left: 15px;margin-right: 15px;border-radius: 30px;"
								v-model="loginForm.userName"
								placeholder="请输入用户名 / 手机号"
								prefixIcon="account-fill"
								prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
					<u-form-item prop="password" >
						<u--input
								style="height: 35px;margin-left: 15px;margin-right: 15px;border-radius: 30px;"
								placeholder="请输入用户密码"
								v-model="loginForm.password"
								type="password"
								prefixIcon="lock-fill"
								prefixIconStyle="font-size: 22px;color: #909399">
						</u--input>
					</u-form-item>
				</u--form>
			</view>
			
			
			<!-- 用户协议 -->
			<u-checkbox-group
					style="margin-left: 25px;margin-top: 60px;"
					v-model="checkboxValue"
					placement="column">
					<u-checkbox name="1" shape="circle"></u-checkbox>
				
				<view style="font-size: 14px;display: flex;flex-direction: row;position: absolute;left: 45px;width: 100%;margin-top: -2px;">
					<view>同意</view>
					<view style="padding-top: 2px;padding-left: 2px;"><u-link href="" :under-line="true" color="rgb(99 180 222)" text="《用户协议》"></u-link></view>
					<view>和</view>
					<view style="padding-top: 2px;padding-left: 2px;"><u-link href="" :under-line="true" color="rgb(99 180 222)" text="《隐私政策》"></u-link></view>
				</view>	
			</u-checkbox-group>
			
			<button style="width: 90%;border-radius: 20px;background-color: #51b7ca;;margin-top: 30px;color: white;" @click="login('loginForm')">账号密码登录</button>
			
			
			<view style="position: absolute;bottom: 180px;width: 100%;">
				<u-divider text="其他登录方式"></u-divider>
				<view class="loginTypeOut">
					
					<view>
						<button class="loginTypeButton" style="background-color: #00c200;"   @click="toWXLogin()">
							<view class="iconfont icon-weixin typeIcon" style="color: white;"></view>
						</button>
						<view class="typeHz">微信登录</view>
					</view>
					<view>
						<button class="loginTypeButton"   @click="toPhoneLogin()">
							<view class="iconfont icon-dianhua" style="color: white;"></view>
						</button>
						<view class="typeHz">手机号登录</view>
					</view>
					
				</view>
				
			</view>
			
		</view>
		
		<!-- 封禁提示 -->
		<view >
			<u-popup closeable @close="showDisable = false"  :round="10" :show="showDisable" mode="center" >
				<view style="height: 10vh;width: 50vw;;padding: 40px 30px 30px 30px;display: flex;justify-content: center;align-items: center;">
					<view class="" v-if="disableForm.disableAllTime != -1">
						<view class="disableTimeClass">{{disableForm.disableContent}}</view>
						<view class="disableSandE">封禁开始时间:{{disableForm.disableStartTime}}</view>
						<view class="disableSandE">预计解封时间:{{disableForm.disableEndTime}}</view> 
					</view>
					<view class="everyTime"  v-if="disableForm.disableAllTime == -1">
						<view>{{disableForm.disableContent}}</view> 
					</view>
					
				</view>
				<view class="tishiclass">给您带来不便，还请谅解~</view>
			</u-popup>
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
				showDisable:false,
				disableForm:{
					disableContent:'',
					disableStartTime:'',
					disableEndTime:'',
					disableAllTime:''
				},
				
				loginForm:{
					userName:'',
					password:''
				},
				
				loginRules:{
					userName:{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					password:{
						type: 'string',
						required: true,
						message: '请填写密码',
						trigger: ['blur', 'change']
					},
					
				},
				checkboxValue:[]
			}
		},
		methods:{
			goBack(){
				uni.switchTab({
					url:'/pages/myInfo/myInfo'
				})
			},
			goHome(){
				uni.switchTab({
					url:'/pages/login/login'
				})
			},
			toPhoneLogin(){
				if(this.checkboxValue.length != 0){
					uni.navigateTo({
						url:'/pages/myInfo/phoneLogin'
					})
				}else{
					uni.showToast({
						position:'center',
						icon:'none',
						title:'请先勾选用户协议￣へ￣',
						duration:3000
					})
				}
			},
			toWXLogin(){
				if(this.checkboxValue.length != 0){
					uni.navigateTo({
						url:'/pages/myInfo/weiXinLogin'
					})
				}else{
					uni.showToast({
						position:'center',
						icon:'none',
						title:'请先勾选用户协议￣へ￣',
						duration:3000
					})
				}
				
			},
			login(formName){
				if(this.checkboxValue.length != 0){
					this.$refs[formName].validate().then(res => {
						uni.request({
						    url: this.userPath+'/user/login', //仅为示例，并非真实接口地址。
						    data: {
						        userName:this.loginForm.userName,
						    	password:this.loginForm.password
						    },
						    success: (res) => {
								if(res.data.code === 200){
									if(res.data.data.user.status === 1){
										//用户状态正常
										uni.setStorage({
												key:'user',
												data:JSON.stringify(res.data.data.user)
										})
										uni.setStorage({
												key:'token',
												data:JSON.stringify(res.data.data.token)
										})
										uni.reLaunch({
											url:'/pages/myInfo/myInfo'
										})
									}else{
										//被封禁
										this.disableForm.disableContent = res.data.data.user.disableAllTime == -1?'您的账号已被永久封禁！封禁期间无法登录':'您的账号已被官方人员封禁'+res.data.data.user.disableAllTime + '天'
										this.disableForm.disableStartTime = res.data.data.user.disableStartTime
										this.disableForm.disableEndTime = res.data.data.user.disableEndTime
										this.disableForm.disableAllTime = res.data.data.user.disableAllTime
										this.showDisable = true
									
									}
									
								}else{
									uni.$u.toast('用户名密码错误')
								}
						        
						    }
						});
						
					}).catch(errors => {
						uni.$u.toast('请填写登录信息')
					})
				}else{
					uni.showToast({
						position:'center',
						icon:'none',
						title:'请先勾选用户协议￣へ￣',
						duration:3000
					})
				}
				
			},
		}
		
	}
</script>

<style scoped>
	.everyTime{
		font-size: 18px;
		color: #3d3c3c;
	}
	.tishiclass{
		text-align: center;
		margin-bottom: 5px;
		color: gray;
	}
	.disableSandE{
		color: gray;
	}
	.disableTimeClass{
		margin-bottom: 5px;
		font-size: 18px;
		color: #3d3c3c;
	}
	.loginBackHeader{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 96%;
		position: absolute;
		margin-left: 2%;
		top: 50px;
		color: white;
	}
	.loginBackIcon{
		display: flex;
		align-items: center;
		font-size: 15px;
	}
	.logo{   
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		width: 100px;
		height: 100px;
		border-radius: 62px;
		border: 4px solid;
		border-color: white;
		margin-top: 100px;
	}
	.loginTypeButton{
		width: 45px;
		height: 45px;
		background-color: #51b7ca;
		border-radius: 30px;
	}
	.typeIcon{
		font-size: 18px;
		margin-left: -2px;
	}
	.loginTypeOut{
		display: flex;
		justify-content: space-around;
	}
	.icon-dianhua{
		font-size: 30px;
		margin-top: -12px;
		margin-left: -6px;
	}
	.typeHz{
		font-size: 10px;
		margin-top: 5px;
		color: #918e8e;
	}
</style>
