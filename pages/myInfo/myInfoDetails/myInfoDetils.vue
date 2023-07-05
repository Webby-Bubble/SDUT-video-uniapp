<template>
	<view class="myInfoDetails">
		<view class="backClass" @click="goBack()">
			<view style="font-size: 12px;" class="iconfont icon-houtui"></view>
			<view style="font-size: 12px;">返回</view>
		</view>
		<!-- 背景 -->
		<view class="myInfoBackImage" 
		:style="myInfoForm.userCover != ''?'background:url('+myInfoForm.userCover+');background-repeat: round;':''">
			
		</view>

		<view class="myInfoContentClass">
			<view class="avataOut">
				<view class="zhaoxiangjiOut">
					<view class="zhaoxianghjiOut">
						<view v-if="myInfoForm.userPic == ''" class="iconfont icon-zhaoxiangji zhaoji"></view>
						<image  v-if="myInfoForm.userPic != ''" 
						style="width: 82px;height:82px;border-radius: 50px;"  :src="myInfoForm.userPic" ></image>
					</view>
					<view>点击更换头像</view>
				</view>

			</view>

			<!-- 内容 -->
			<view class="myInfoContent">
				<u--form labelPosition="left" labelWidth="70px" :model="myInfoForm" ref="myInfoForm">
					<u-form-item label="姓名" prop="userName" borderBottom ref="item1">
						<u--input v-model="myInfoForm.userName" border="none"></u--input>
					</u-form-item>
					<u-form-item label="性别" prop="sex" borderBottom @click="showSex = true;" ref="item1">
						<u--input v-model="myInfoForm.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					
					<u-form-item label="年龄" prop="age" borderBottom ref="item1">
						<u--input type="number" v-model="myInfoForm.age" border="none" placeholder="请输入年龄"></u--input>
					</u-form-item>
					<!-- <u-form-item label="年龄" prop="age" borderBottom @click="showAge = true;" ref="item1">
						<u--input v-model="myInfoForm.age" disabled disabledColor="#ffffff" placeholder="请选择出生年月日"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item> -->

					<u-form-item label="简介" prop="content" borderBottom ref="item1">
						<u--input v-model="myInfoForm.content" placeholder="清填写简介" border="none"></u--input>
					</u-form-item>
					
					<u-form-item label="邮箱" prop="email" borderBottom ref="item1">
						<u--input v-model="myInfoForm.email" placeholder="请填写邮箱" border="none"></u--input>
					</u-form-item>
					
					<u-form-item  label="手机号" prop="phone" borderBottom ref="item1">
						<u--input v-model="myInfoForm.phone" placeholder="请填写手机号" border="none"></u--input>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>
				<u-datetime-picker :formatter="formatter" @close="showAge = false" @confirm="selectAge" :show="showAge"
					v-model="nowDate" mode="date"></u-datetime-picker>
			</view>
			
			<view class="updateMyInfoButton">
				<button class="updateButton" @click="updateUserInfo()">确认修改</button>
			</view>
			<u-divider textSize="10" text="如需使用举报功能,请务必填写邮箱"></u-divider>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSex: false,
				showAge: false,
				nowDate:Number(new Date()),
				myInfoForm: {
					id:'',
					userName: '',
					sex: '',
					content: '',
					age: '',
					userPic:'',
					userCover:'',
					role:''
				},
				actions: [{
					name: '男',
				}, {
					name: '女',
				}]
				
			}
		},
		methods: {
			updateUserInfo(){
				uni.request({
					url:this.userPath + '/user/updateUserInfo',
					method:'POST',
					data:this.myInfoForm,
					success: (res) => {
						if(res.data.code === 200){
							uni.showToast({
								title:'信息修改成功',
								duration:3000,
								icon:'none'
							})
							uni.setStorageSync('user',JSON.stringify(this.myInfoForm))
							uni.reLaunch({
								url:'/pages/myInfo/myInfo'
							})
						}
					}
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			//选择性别
			sexSelect(val) {
				this.myInfoForm.sex = val.name
			},
			selectAge(val) {
				console.log(this.formatDate(new Date(val.value)))
				this.myInfoForm.age = this.formatDate(new Date(val.value))
				console.log(this.myInfoForm.age )
				this.showAge = false
			},
			//世家转换
			 formatDate(now) {
			  　　var year = now.getFullYear(),
			  　　month = now.getMonth() + 1,
			  　　date = now.getDate(),
			  　　hour = now.getHours(),
			  　　minute = now.getMinutes(),
			  　　second = now.getSeconds();
			  　　return year + "-" + month + "-" + date;
			 }
		},
		onLoad(option) {
			this.myInfoForm = JSON.parse(option.user || '{}')
		}
	}
</script>

<style scoped>
	@import url("myInfoDetails.css");
</style>