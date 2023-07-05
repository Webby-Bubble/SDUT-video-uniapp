<template>
	<view class="guanZhuAndFenSiAll">
		<back-menu :title="user.userName"></back-menu>
		<view style="padding-top: 100px;">
			<u-row>
				<u-col :span="4"><u-tabs style="text-align: center;" @click="tabClick" :list="tabsList"></u-tabs></u-col>
				<u-col :span="8">
					<view style="display: flex;align-items: center;">
						<u--input
							style="height: 16px;background-color: rgb(249 249 249);width: 88%;border-radius: 6px;"
							placeholder="搜索用户的名字"
							prefixIcon="search"
							v-model="queryName"
							prefixIconStyle="font-size: 22px;color: #909399"
						></u--input>
						<button class="queryFensiButton"  @click="queryByUserName()">
							<view style="margin-top: -2px;color: #9e9e9e;font-size: 13px;color: white;" >搜索</view>
						</button>
					</view>
					
				</u-col>
			</u-row>
		</view>
		<u-line></u-line>
		
		<!-- 没有关注和粉丝的图标 -->
		<view v-if="guanZhuOrFenSiList.length == 0 && tabName == '关注'"  style="position: absolute;top: 30%;left: 0;right: 0;margin: auto;text-align: center;">
			 <view style="font-size: 110px;color: #b8d1e6;" class="iconfont icon-lab-kuqi"></view>
			 <view  style="margin-top: 30px;color: #79828a;">快去关注你喜欢的人吧</view>
		</view>
		<view v-if="guanZhuOrFenSiList.length == 0 && tabName == '粉丝'"  style="position: absolute;top: 30%;left: 0;right: 0;margin: auto;text-align: center;">
			 <view style="font-size: 110px;color: #b8d1e6;" class="iconfont icon-lab-kuqi"></view>
			 <view  style="margin-top: 30px;color: #79828a;">还没有粉丝呐，真伤心</view>
		</view>
		
		
		<!-- 滑动组件 -->
		<scroll-view scroll-y="true" style="height: 500px;">
			<view v-for="user in guanZhuOrFenSiList" :key="user.id" style="margin-top: 20px;margin-left: 10px;display: flex;flex-direction: row;justify-content: space-between;">
				<view style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;margin-top: -5px;">
					<image :src="user.userPic" style="width: 45px;height: 45px;border-radius: 25px;"></image>
					<view style="margin-left: 10px;">{{user.userName}}</view>
				</view>
				<view style="margin-right: 10px;">
					<button v-if="tabName =='关注'"  @click="submitGuanZhu(user.id,1)"><view style="font-size: 13px;width: 60px;" >已关注</view></button>
					<button v-if="tabName =='粉丝'" :style= "!user.mutual?'background-color: #ec4f87':''" @click="submitGuanZhu(user.id,2)">
						<view v-if="!user.mutual" style="font-size: 13px;width: 60px;color: white;" >回关</view>
						<view class="iconfont icon-xianghujiaohuan"  v-if="user.mutual" style="font-size: 13px;width: 70px;"><text style="padding-left: 5px;">相互关注</text></view>
					</button>
				</view>
			</view>
		</scroll-view>
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
				user:{
					id:'',
					userName:'',
				},
				tabsList:[
					{name:'关注'},{name:'粉丝'}
				],
				guanZhuOrFenSiList:[],
				tabName:'关注',
				queryName:''
			}
		},
		methods:{
			// 根据输入框的条件查询粉丝和关注
			queryByUserName(){
				if(this.tabName == '关注'){
					this.queryAllGuanZhuByUserId(1)
				}else{
					this.queryAllGuanZhuByUserId(2)
				}
			},
			submitGuanZhu(beiguanzhuUserId,type){
				uni.request({
					url:this.videoPath+'/video/guanzhu',
					data:{
						guanZhuUserId:this.user.id,
						beiGuanZhuUserId:beiguanzhuUserId
					},
					success:res=>{
						if(type == 1){
							this.queryAllGuanZhuByUserId(1)
						}else{
							this.queryAllGuanZhuByUserId(2)
						}
						
						
					}
				})
			},
			tabClick(item){
				
				if(item.name =='关注'){
					this.tabName = item.name
					this.queryAllGuanZhuByUserId(1)
				}else{
					this.tabName = item.name
					this.queryAllGuanZhuByUserId(2)
				}
			},
			queryAllGuanZhuByUserId(type){
				uni.request({
					url:this.userPath + '/user/queryAllGuanZhuByUserId',
					data:{userId:this.user.id,
						type:type,
						userName:this.queryName
					},//type表示查询的类型  1表示关注  2表示粉丝
					success:res=>{
						this.guanZhuOrFenSiList = res.data.data
					}
				})
			}
		},
		onLoad(option) {
			this.user.userName = option.userName
			this.user.id = option.userId
			this.queryAllGuanZhuByUserId(1)
		}
	}
</script>

<style scoped>
	.queryFensiButton{
		height: 28px;
		margin-left: 5px;
		margin-right: 5px;
		background-color: #3aafc5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
