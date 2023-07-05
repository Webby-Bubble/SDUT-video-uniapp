<template>
	<view class="phone">
		<view class="bgColor"></view>
		<view style="text-align: center;font-size: 25px;margin-top: -80px;">手机号登录</view>

		<view style="width: 90%;margin-left: 5%;margin-top: 70px;">
			<u--form :model="phoneForm" :rules="rules" ref="phoneForm">
				<view class="inputPhone">
					<u-form-item prop="phone">
						<u-input v-model="phoneForm.phone" placeholder="请输入手机号" border="bottom" clearable>
							<u--text class="prefixClass" text="+86" slot="prefix" margin="0 3px 0 0" type="tips">
							</u--text>
						</u-input>
					</u-form-item>
				</view>
				<view class="inputPhone">
					<u-form-item prop="code">
						<u-input v-model="phoneForm.code" placeholder="请输入内容" border="bottom" clearable>
							<u--text class="prefixClass" text="验证码" slot="prefix" margin="0 3px 0 0" type="tips">
							</u--text>
							<template slot="suffix">
								<view class="codeImageOut">
									<view>
										<image class="codeImage" :src="codeUrl" @click="getCode()"></image>
									</view>
									<view class="codeTimeClass">
										{{codeTime < 0 ?timeOutMsg:codeTime+'s'}}
									</view>
								</view>

							</template>
						</u-input>
					</u-form-item>
				</view>
			</u--form>
		</view>

		<view>
			<button style="width: 90%;border-radius: 20px;background-color: #51b7ca;;margin-top: 70px;color: white;"
				@click="phoneLogin('phoneForm')">立即登录</button>
		</view>

	</view>
</template>

<script>
	import backHome from '@/componets/backMenu/backMenu.vue'
	export default {
		components: {
			backHome
		},
		data() {
			return {
				codeUrl: '',
				codeTime: 60,
				timeInterval: '',
				timeOutMsg: '',
				phoneForm: {
					phone:'',
					code:''
				},
				rules:{
					'phone': {
						type: 'string',
						required: true,
						message: '请填写手机号',
						trigger: ['blur']
					},
					'code': {
						type: 'string',
						required: true,
						message: '请填写验证码',
						trigger: ['blur']
					},
				}
			}
		},
		methods: {
			//手机号登录
			phoneLogin(formName){
				this.$refs[formName].validate().then(valid=>{
					uni.request({
						url:this.userPath + '/user/login',
						method:'GET',
						data:{
							phone:this.phoneForm.phone,
							code:this.phoneForm.code
						},
						success: (res) => {
							if(res.data.code === 200){
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
								uni.$u.toast(res.data.data)
							}
						}
					})
				})
					
			},
			
			getCode() {
				uni.request({
					url: this.userPath + '/user/getCode',
					method: 'GET',
					success: (res) => {
						this.codeUrl = res.data.data.baseImageUrl // 将他转化为路径
						//倒计时
						this.codeTime = 60
						this.timeOutMsg = ""
						clearInterval(this.timeInterval)
						this.timeInterval = setInterval(this.updateTime, 1000)
					}

				})

			},
			updateTime() {
				this.codeTime = --this.codeTime
				if (this.codeTime < 0) {
					this.timeOutMsg = "请刷新！"
					clearInterval(this.timeInterval)

				}
			}
		},
		onLoad() {
			this.getCode()
		}
	}
</script>

<style scoped>
	.bgColor {
		height: 250px;
		background-image: linear-gradient(to bottom, #5ec1d4de, white);
	}

	.inputPhone {
		margin-top: 50px;
	}

	.prefixClass {
		font-size: 16px;
		font-weight: 600;
	}

	.codeImage {
		width: 80px;
		height: 25px;
	}

	.codeImageOut {
		display: flex;
		align-items: center;
	}

	.codeTimeClass {
		margin-left: 10px;
	}
</style>
