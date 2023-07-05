<template>
	<view class="regist">
		<back-menu title="用户注册"></back-menu>
		<view style="padding-top: 100px;">
			<u--form 
				labelPosition="left"
				:model="regForm"
				:rules="regRules"
				style="margin-left: 10px;margin-right: 10px;"
				ref="regForm">
				<u-form-item borderBottom prop="userName" label="用户名:" :labelWidth="labelWith">
					<u--input
							v-model="regForm.userName"
							placeholder="请输入用户名"
							prefixIcon="account-fill"
							border="none"
							prefixIconStyle="font-size: 22px;color: #909399">
					</u--input>
				</u-form-item>
				<u-form-item borderBottom prop="password" label="用户密码:" :labelWidth="labelWith">
					<u--input
							v-model="regForm.password"
							placeholder="请输入用户密码"
							prefixIcon="lock-fill"
							border="none"
							prefixIconStyle="font-size: 22px;color: #909399">
					</u--input>
				</u-form-item>
				<u-form-item borderBottom prop="confirmPassword" label="确认密码:" :labelWidth="labelWith">
					<u--input
							v-model="regForm.confirmPassword"
							placeholder="请确认用户密码"
							prefixIcon="lock-fill"
							border="none"
							prefixIconStyle="font-size: 22px;color: #909399">
					</u--input>
				</u-form-item>
		
				<u-form-item label="性别:" @click="showSex = true" :labelWidth="labelWith" borderBottom prop="sex">
					<u--input
							v-model="regForm.sex"
							disabled
							prefixIcon="woman"
							disabledColor="#ffffff"
							placeholder="请选择性别"
							border="none"
					></u--input>
					<u-icon
							slot="right"
							name="arrow-right"
					></u-icon>
					
				</u-form-item>
				<u-form-item prop="content">
					<u--textarea v-model="regForm.content" placeholder="请输入个人简介" count ></u--textarea>
				</u-form-item>
				<u-form-item borderBottom prop="age" label="年龄:" :labelWidth="labelWith">
					<u--input
							type="number"
							v-model="regForm.age"
							placeholder="请输入年龄"
							prefixIcon="account-fill"
							border="none"
							prefixIconStyle="font-size: 22px;color: #909399">
					</u--input>
				</u-form-item>
				<button style="position: absolute;bottom: 15%;width: 90%;
				left: 0;right: 0;margin: auto;border-radius: 20px;background-color: rgb(71 176 197);color: white;" @click="submitRegist('regForm')">点击注册</button>
			</u--form>
			<!-- 性别选择器 -->
			<u-action-sheet
				:show="showSex"
				:actions="actions"
				title="请选择性别"
				@close="showSex = false"
				@select="sexSelect">
			</u-action-sheet>
			
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
				showSex:false,
				labelWith:'70px',
				regForm:{
					userName:'',
					password:'',
					confirmPassword:'',
					userPic:'',
					userCover:'',
					sex:'',
					content:'',
					age:''
				},
				regRules:{
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
					confirmPassword:{
						type: 'string',
						required: true,
						message: '请填写确认密码',
						trigger: ['blur', 'change']
					},
					sex:{
						type: 'string',
						required: true,
						message: '请选择性别',
						trigger: ['change']
					},
					content:{
						type: 'string',
						required: true,
						message: '不要忘了介绍自己',
						trigger: ['change']
					},
					age:{
						type: 'string',
						required: true,
						message: '请输入年龄',
						trigger: ['change']
					}
				},
				actions:[{name:'男'},{name:'女'}],
				tempFilePathsTx:[],
			}
		},
		methods:{
			sexSelect(e){
				this.regForm.sex = e.name
			},
			submitRegist(formName){
				if(this.regForm.password === this.regForm.confirmPassword){
					this.$refs[formName].validate().then(res=>{
						uni.request({
							url:this.path+'/user/addUser',
							method:'POST',
							data:this.regForm,
							success:res=>{
								if(res.data.code === 200){
									uni.showToast({
										position:'center',
										title:'注册成功( •̀ ω •́ )y',
										icon:'none',
										duration:3000
									}),
									uni.navigateTo({
										url:'/pages/myInfo/userLogin'
									})
								}
							}
						})
					}).catch((error)=>{
						uni.showToast({
							position:'center',
							title:'请按照表单格式要求填写╮(╯▽╰)╭',
						})
					})
				}else{
					uni.showToast({
						position:'center',
						title:'两次密码不一致🤔',
						duration:3000,
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style scoped>
/deep/.u-form-item{
	margin-top: 10px;
}
</style>
